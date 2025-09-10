# Testing Guide for MnemoPhi Dashboard

## Overview
This guide covers the comprehensive testing strategy for the MnemoPhi Dashboard frontend application, including unit tests, integration tests, and end-to-end tests.

## Testing Stack

### Core Testing Tools
- **Jest**: Unit and integration testing framework
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing framework
- **@axe-core/playwright**: Accessibility testing

### Additional Tools
- **MSW**: API mocking for integration tests
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom Jest matchers

## Test Structure

```
src/
├── components/
│   └── __tests__/           # Component unit tests
├── pages/
│   └── __tests__/           # Page component tests
├── lib/
│   └── __tests__/           # Integration tests
├── utils/
│   └── __tests__/           # Utility function tests
├── setupTests.ts            # Test setup configuration
└── jest.config.js           # Jest configuration

e2e/                         # End-to-end tests
├── auth.spec.ts
├── dashboard.spec.ts
├── users.spec.ts
├── analytics.spec.ts
├── user-journey.spec.ts
├── cross-browser.spec.ts
└── accessibility.spec.ts
```

## Unit Testing

### Component Testing
Test individual components in isolation with mocked dependencies.

```tsx
// Example: Button component test
import { render, screen, fireEvent } from '@testing-library/react'
import { AccessibleButton } from '../AccessibleButton'

describe('AccessibleButton', () => {
  it('should render with correct text', () => {
    render(<AccessibleButton>Click me</AccessibleButton>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when loading', () => {
    render(<AccessibleButton loading>Click me</AccessibleButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Page Component Testing
Test complete page components with their interactions.

```tsx
// Example: Login page test
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginPage } from '../LoginPage'

// Mock dependencies
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
    isAuthenticated: false,
  }),
}))

describe('LoginPage', () => {
  it('should render login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should handle form submission', async () => {
    const mockLogin = jest.fn()
    jest.mocked(useAuthStore).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
    })

    render(<LoginPage />)
    
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })
})
```

### Utility Function Testing
Test pure functions and utilities.

```tsx
// Example: Accessibility utility test
import { generateId, createFormFieldProps } from '../accessibility'

describe('accessibility utilities', () => {
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId('test')
      const id2 = generateId('test')
      
      expect(id1).toMatch(/^test-[a-z0-9]+$/)
      expect(id2).toMatch(/^test-[a-z0-9]+$/)
      expect(id1).not.toBe(id2)
    })
  })

  describe('createFormFieldProps', () => {
    it('should create proper ARIA attributes', () => {
      const props = createFormFieldProps('field-1', 'Email Address', 'Required field', true)
      
      expect(props).toEqual({
        id: 'field-1',
        'aria-label': 'Email Address',
        'aria-required': true,
        'aria-invalid': 'true',
        'aria-describedby': 'field-1-error'
      })
    })
  })
})
```

## Integration Testing

### API Integration Tests
Test API client functionality with mocked responses.

```tsx
// Example: API client integration test
import { apiClient } from '@mnemophi/shared'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API Client Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful API requests', async () => {
    const mockData = { users: [{ id: 1, name: 'John Doe' }] }
    mockedAxios.get.mockResolvedValue({ data: mockData })

    const result = await apiClient.get('/users')
    
    expect(result).toEqual(mockData)
    expect(mockedAxios.get).toHaveBeenCalledWith('/users')
  })

  it('should handle API errors', async () => {
    const error = new Error('Network Error')
    mockedAxios.get.mockRejectedValue(error)

    await expect(apiClient.get('/users')).rejects.toThrow('Network Error')
  })
})
```

### State Management Integration Tests
Test Zustand store integrations.

```tsx
// Example: Auth store integration test
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@mnemophi/shared'

// Mock the shared library
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

describe('Auth Store Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle login flow', async () => {
    const mockLogin = jest.fn().mockResolvedValue({ success: true })
    const mockUseAuthStore = jest.mocked(useAuthStore)
    
    mockUseAuthStore.mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      user: null,
    })

    const { result } = renderHook(() => useAuthStore())
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      })
    })

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})
```

### Form Integration Tests
Test complete form workflows.

```tsx
// Example: Login form integration test
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginPage } from '../LoginPage'

// Mock dependencies
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
    isAuthenticated: false,
  }),
}))

describe('Login Form Integration', () => {
  it('should handle complete login flow', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    // Fill form
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    // Verify submission
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })
})
```

## End-to-End Testing

### Authentication Flow Tests
Test complete user authentication journeys.

```typescript
// Example: E2E authentication test
import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should complete login process', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login')
    
    // Verify page elements
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    await expect(page.getByLabelText(/email address/i)).toBeVisible()
    await expect(page.getByLabelText(/password/i)).toBeVisible()
    
    // Fill and submit form
    await page.getByLabelText(/email address/i).fill('admin@mnemophi.com')
    await page.getByLabelText(/password/i).fill('password')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/)
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })
})
```

### User Journey Tests
Test complete user workflows across multiple pages.

```typescript
// Example: Complete user journey test
test('should complete full user journey', async ({ page }) => {
  // Login
  await page.goto('/auth/login')
  await page.getByRole('button', { name: /quick login/i }).click()
  await expect(page).toHaveURL(/.*dashboard/)
  
  // Navigate to users
  await page.getByRole('link', { name: /users/i }).click()
  await expect(page).toHaveURL(/.*users/)
  
  // Navigate to analytics
  await page.getByRole('link', { name: /analytics/i }).click()
  await expect(page).toHaveURL(/.*analytics/)
  
  // Test tab navigation
  await page.getByRole('tab', { name: /trends/i }).click()
  await expect(page.getByRole('tab', { name: /trends/i })).toHaveAttribute('aria-selected', 'true')
  
  // Logout
  await page.getByText(/sign out/i).click()
  await expect(page).toHaveURL(/.*login/)
})
```

### Cross-Browser Testing
Test application compatibility across different browsers.

```typescript
// Example: Cross-browser test
test.describe('Cross-Browser Compatibility', () => {
  test('should work consistently across browsers', async ({ page, browserName }) => {
    // Login
    await page.goto('/auth/login')
    await page.getByRole('button', { name: /quick login/i }).click()
    
    // Test basic functionality
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
    
    // Test navigation
    await page.getByRole('link', { name: /users/i }).click()
    await expect(page).toHaveURL(/.*users/)
    
    console.log(`Test completed successfully on ${browserName}`)
  })
})
```

## Running Tests

### Unit and Integration Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- LoginPage.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should handle login"
```

### End-to-End Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run specific test file
npm run test:e2e -- auth.spec.ts

# Run tests matching pattern
npm run test:e2e -- --grep "should complete login"
```

### Test Coverage
```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mnemophi/shared$': '<rootDir>/../shared/src/index.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/setupTests.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

### Playwright Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests focused and independent

### Mocking Strategy
- Mock external dependencies
- Use MSW for API mocking
- Mock at the module level when possible
- Keep mocks simple and focused

### Test Data
- Use factories for test data generation
- Keep test data minimal and relevant
- Use consistent naming conventions
- Clean up test data after tests

### Performance
- Run tests in parallel when possible
- Use efficient selectors
- Avoid unnecessary waits
- Optimize test execution time

## Troubleshooting

### Common Issues

#### Tests Failing Due to Missing Mocks
```typescript
// Solution: Add proper mocks
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
    isAuthenticated: false,
    user: null,
  }),
}))
```

#### E2E Tests Timing Out
```typescript
// Solution: Increase timeout and add proper waits
test('should handle slow loading', async ({ page }) => {
  await page.goto('/dashboard')
  await page.waitForSelector('[data-testid="dashboard-content"]', { timeout: 10000 })
})
```

#### Flaky Tests
```typescript
// Solution: Use proper waits and stable selectors
await expect(page.getByRole('button', { name: /submit/i })).toBeVisible()
await page.getByRole('button', { name: /submit/i }).click()
await expect(page.getByText(/success/i)).toBeVisible()
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

---

**Last Updated**: 2024-01-15  
**Version**: 1.0.0  
**Maintained By**: Development Team