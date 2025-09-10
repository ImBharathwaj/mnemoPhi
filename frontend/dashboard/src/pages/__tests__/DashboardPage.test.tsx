import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { DashboardPage } from '../DashboardPage'
import { useAuthStore } from '@mnemophi/shared'

// Mock the shared store
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('DashboardPage', () => {
  const mockUser = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  }

  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders dashboard title and subtitle', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByText('Welcome back, John!')).toBeInTheDocument()
  })

  it('displays key metrics cards', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('2,847')).toBeInTheDocument()
    expect(screen.getByText('Consent Categories')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('Compliance Rate')).toBeInTheDocument()
    expect(screen.getByText('94.2%')).toBeInTheDocument()
    expect(screen.getByText('Withdrawal Requests')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
  })

  it('displays recent activity feed', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText('New consent granted')).toBeInTheDocument()
    expect(screen.getByText('Preference updated')).toBeInTheDocument()
  })

  it('displays quick actions', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText('Add Consent Category')).toBeInTheDocument()
  })

  it('shows user welcome message', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText('Welcome back, John!')).toBeInTheDocument()
  })

  it('displays component working message', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText('If you can see this, the component is working.')).toBeInTheDocument()
  })
})