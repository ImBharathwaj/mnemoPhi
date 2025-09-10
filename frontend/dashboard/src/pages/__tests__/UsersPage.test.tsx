import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { UsersPage } from '../UsersPage'
import { useAuthStore } from '@mnemophi/shared'

// Mock the shared store
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('UsersPage', () => {
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

  it('renders users page title and subtitle', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
    expect(screen.getByText('5 users')).toBeInTheDocument()
  })

  it('displays search and filter controls', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
    expect(screen.getByText('All Status')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Last Login')).toBeInTheDocument()
  })

  it('displays users table with headers', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Consent Ratio')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Last Login' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Join Date' })).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('displays mock user data', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getAllByText('john.doe@example.com')[0]).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getAllByText('jane.smith@example.com')[0]).toBeInTheDocument()
  })

  it('filters users when search term is entered', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText('Search users...')
    fireEvent.change(searchInput, { target: { value: 'John' } })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('displays user status indicators', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getAllByText('Pending')[0]).toBeInTheDocument()
  })

  it('displays consent status ratios', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('3/5')).toBeInTheDocument()
    expect(screen.getByText('6/8')).toBeInTheDocument()
  })

  it('displays action buttons for each user', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    // Check for action buttons by looking for the icons or buttons
    const actionButtons = screen.getAllByRole('button')
    expect(actionButtons.length).toBeGreaterThan(0)
  })

  it('displays export button', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('shows empty state when no users match filter', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText('Search users...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    expect(screen.getByText('No users found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search or filter criteria')).toBeInTheDocument()
  })

  it('displays user count in subtitle', () => {
    render(
      <TestWrapper>
        <UsersPage />
      </TestWrapper>
    )

    expect(screen.getByText('5 users')).toBeInTheDocument()
  })
})