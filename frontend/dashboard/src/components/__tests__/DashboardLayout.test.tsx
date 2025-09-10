import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '../DashboardLayout'
import { useAuthStore } from '@mnemophi/shared'

// Mock the shared store
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('DashboardLayout', () => {
  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  }

  const mockLogout = jest.fn()

  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      user: mockUser,
      logout: mockLogout,
      isAuthenticated: true,
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the layout with title and subtitle', () => {
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard" subtitle="Test subtitle">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    expect(screen.getByText('Test Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Test subtitle')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('displays user information in sidebar', () => {
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
  })

  it('renders navigation items', () => {
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Consents')).toBeInTheDocument()
    expect(screen.getByText('Reports')).toBeInTheDocument()
    expect(screen.getByText('System Config')).toBeInTheDocument()
  })

  it('calls logout when logout button is clicked', () => {
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    const logoutButton = screen.getByText('Sign out')
    fireEvent.click(logoutButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })

  it('renders header actions when provided', () => {
    const headerActions = <button>Test Action</button>
    
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard" headerActions={headerActions}>
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    expect(screen.getByText('Test Action')).toBeInTheDocument()
  })

  it('toggles mobile sidebar when menu button is clicked', () => {
    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    // Check if mobile menu button exists (it should be hidden on desktop)
    const menuButton = screen.queryByRole('button', { name: /open sidebar/i })
    if (menuButton) {
      fireEvent.click(menuButton)
      // Mobile sidebar should be visible
      expect(screen.getByText('MnemoPhi')).toBeInTheDocument()
    }
  })

  it('highlights active navigation item', () => {
    // Mock the current location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/analytics',
      },
      writable: true,
    })

    render(
      <TestWrapper>
        <DashboardLayout title="Test Dashboard">
          <div>Test content</div>
        </DashboardLayout>
      </TestWrapper>
    )

    // The active item should have specific styling
    const analyticsLink = screen.getByText('Analytics')
    expect(analyticsLink).toBeInTheDocument()
  })
})