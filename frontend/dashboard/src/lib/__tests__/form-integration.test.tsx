import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useAuthStore } from '@mnemophi/shared'
import { LoginPage } from '../../pages/LoginPage'
import { RegisterPage } from '../../pages/RegisterPage'

// Mock react-router-dom
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Mock the auth store
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('Form Integration Tests', () => {
  const mockStoreMethods = {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    setUser: jest.fn(),
    setToken: jest.fn(),
    clearError: jest.fn(),
    setLoading: jest.fn(),
    setError: jest.fn(),
  }

  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      ...mockStoreMethods,
    })
    jest.clearAllMocks()
  })

  describe('Login Form Integration', () => {
    it('should handle successful login form submission', async () => {
      mockStoreMethods.login.mockResolvedValue(undefined)

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      // Fill in the form
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Submit the form
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockStoreMethods.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          rememberMe: false,
        })
      })
    })

    it('should handle login form loading state', async () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /sign in/i })

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Submit the form
      fireEvent.click(submitButton)

      // Button should show loading state
      await waitFor(() => {
        expect(screen.getByText('Signing in...')).toBeInTheDocument()
      })
    })

    it('should handle quick login demo button', async () => {
      mockStoreMethods.login.mockResolvedValue(undefined)

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const quickLoginButton = screen.getByRole('button', { name: /quick login/i })

      fireEvent.click(quickLoginButton)

      // The quick login button sets the form data and then submits
      // We need to wait for the form submission to complete
      await waitFor(() => {
        expect(mockStoreMethods.login).toHaveBeenCalled()
      })

      // Check that the form data was set correctly
      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      
      expect(emailInput).toHaveValue('admin@mnemophi.com')
      expect(passwordInput).toHaveValue('password')
    })

    it('should handle remember me checkbox', async () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const rememberMeCheckbox = screen.getByLabelText(/remember me/i)

      expect(rememberMeCheckbox).not.toBeChecked()

      fireEvent.click(rememberMeCheckbox)

      expect(rememberMeCheckbox).toBeChecked()
    })
  })

  describe('Register Form Integration', () => {
    it('should render registration form fields', () => {
      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      )

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/create a password/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
    })

    it('should handle form input changes', () => {
      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      )

      const firstNameInput = screen.getByLabelText(/first name/i)
      const emailInput = screen.getByLabelText(/email/i)

      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

      expect(firstNameInput).toHaveValue('John')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('should handle terms acceptance checkbox', () => {
      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      )

      const termsCheckbox = screen.getByLabelText(/i agree to the/i)

      expect(termsCheckbox).not.toBeChecked()

      fireEvent.click(termsCheckbox)

      expect(termsCheckbox).toBeChecked()
    })
  })

  describe('Form State Management Integration', () => {
    it('should handle form input state changes', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)

      // Initial state
      expect(emailInput).toHaveValue('')
      expect(passwordInput).toHaveValue('')

      // Change values
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Verify state changes
      expect(emailInput).toHaveValue('test@example.com')
      expect(passwordInput).toHaveValue('password123')
    })

    it('should handle checkbox state changes', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const rememberMeCheckbox = screen.getByLabelText(/remember me/i)

      // Initial state
      expect(rememberMeCheckbox).not.toBeChecked()

      // Toggle checkbox
      fireEvent.click(rememberMeCheckbox)
      expect(rememberMeCheckbox).toBeChecked()

      fireEvent.click(rememberMeCheckbox)
      expect(rememberMeCheckbox).not.toBeChecked()
    })
  })

  describe('Form Accessibility Integration', () => {
    it('should have proper form labels', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const rememberMeCheckbox = screen.getByLabelText(/remember me/i)

      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument()
      expect(rememberMeCheckbox).toBeInTheDocument()
    })

    it('should have proper button roles', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const signInButton = screen.getByRole('button', { name: /sign in/i })
      const quickLoginButton = screen.getByRole('button', { name: /quick login/i })

      expect(signInButton).toBeInTheDocument()
      expect(quickLoginButton).toBeInTheDocument()
    })

    it('should have proper input types', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      )

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)

      expect(emailInput).toHaveAttribute('type', 'email')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })
})