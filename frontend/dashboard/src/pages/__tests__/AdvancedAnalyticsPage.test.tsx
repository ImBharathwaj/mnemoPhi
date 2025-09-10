import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AdvancedAnalyticsPage } from '../AdvancedAnalyticsPage'
import { useAnalyticsStore, useAuthStore } from '@mnemophi/shared'

// Mock the shared store
jest.mock('@mnemophi/shared', () => ({
  useAnalyticsStore: jest.fn(),
  useAuthStore: jest.fn(),
  ConsentTrendChart: ({ data }: any) => <div data-testid="consent-trend-chart">Consent Trend Chart</div>,
  ConsentCategoryChart: ({ data }: any) => <div data-testid="consent-category-chart">Consent Category Chart</div>,
  ComplianceMetricsComponent: ({ data }: any) => <div data-testid="compliance-metrics">Compliance Metrics</div>,
  GeographicDistribution: ({ data }: any) => <div data-testid="geographic-distribution">Geographic Distribution</div>,
  ReportBuilder: ({ templates, onGenerateReport, onSaveTemplate }: any) => <div data-testid="report-builder">Report Builder</div>,
}))

const mockUseAnalyticsStore = useAnalyticsStore as jest.MockedFunction<typeof useAnalyticsStore>
const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('AdvancedAnalyticsPage', () => {
  const mockAnalyticsData = {
    consentTrends: [
      { date: '2024-01-01', consents: 100, withdrawals: 10 },
      { date: '2024-01-02', consents: 120, withdrawals: 15 },
    ],
    consentCategories: [
      { id: '1', name: 'Marketing', count: 500 },
      { id: '2', name: 'Analytics', count: 300 },
    ],
    geographicData: [
      { country: 'US', users: 1000, compliance: 95 },
      { country: 'EU', users: 800, compliance: 98 },
    ],
    complianceMetrics: {
      gdpr: 98,
      ccpa: 95,
      lgpd: 97,
    },
  }

  const mockStoreMethods = {
    fetchConsentTrends: jest.fn(),
    fetchConsentCategories: jest.fn(),
    fetchGeographicData: jest.fn(),
    fetchComplianceMetrics: jest.fn(),
    fetchReportTemplates: jest.fn(),
    clearError: jest.fn(),
  }

  beforeEach(() => {
    mockUseAnalyticsStore.mockReturnValue({
      ...mockAnalyticsData,
      isLoading: false,
      error: null,
      ...mockStoreMethods,
    } as any)

    mockUseAuthStore.mockReturnValue({
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      },
      isAuthenticated: true,
      logout: jest.fn(),
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders analytics page title and subtitle', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getAllByRole('heading', { name: 'Analytics' })[0]).toBeInTheDocument()
    expect(screen.getAllByText('Comprehensive insights and predictive analytics for consent management')[0]).toBeInTheDocument()
  })

  it('displays tab navigation', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Trends')).toBeInTheDocument()
    expect(screen.getByText('Geographic')).toBeInTheDocument()
    expect(screen.getByText('Compliance')).toBeInTheDocument()
    expect(screen.getAllByText('Reports')[0]).toBeInTheDocument()
    expect(screen.getByText('Predictive')).toBeInTheDocument()
  })

  it('displays overview metrics when overview tab is active', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getAllByText('Total Users')[0]).toBeInTheDocument()
    expect(screen.getAllByText('2,847')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Active Consents')[0]).toBeInTheDocument()
    expect(screen.getAllByText('18,923')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Compliance Rate')[0]).toBeInTheDocument()
    expect(screen.getAllByText('94.2%')[0]).toBeInTheDocument()
    expect(screen.getByText('Risk Score')).toBeInTheDocument()
    expect(screen.getByText('2.1/10')).toBeInTheDocument()
  })

  it('switches tabs when tab is clicked', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    const trendsTab = screen.getByText('Trends')
    fireEvent.click(trendsTab)

    expect(screen.getByText('Consent Trends')).toBeInTheDocument()
    expect(screen.getByText('Consent Categories')).toBeInTheDocument()
  })

  it('displays loading state when data is loading', () => {
    mockUseAnalyticsStore.mockReturnValue({
      ...mockAnalyticsData,
      isLoading: true,
      error: null,
      ...mockStoreMethods,
    } as any)

    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getByText('Loading analytics data...')).toBeInTheDocument()
  })

  it('displays error state when there is an error', () => {
    mockUseAnalyticsStore.mockReturnValue({
      ...mockAnalyticsData,
      isLoading: false,
      error: 'Failed to load analytics data',
      ...mockStoreMethods,
    } as any)

    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('Failed to load analytics data')).toBeInTheDocument()
  })

  it('calls refresh when refresh button is clicked', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    const refreshButton = screen.getByText('Refresh')
    fireEvent.click(refreshButton)

    expect(mockStoreMethods.fetchConsentTrends).toHaveBeenCalled()
    expect(mockStoreMethods.fetchConsentCategories).toHaveBeenCalled()
    expect(mockStoreMethods.fetchGeographicData).toHaveBeenCalled()
    expect(mockStoreMethods.fetchComplianceMetrics).toHaveBeenCalled()
    expect(mockStoreMethods.fetchReportTemplates).toHaveBeenCalled()
  })

  it('displays export options', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getByText('Export Analytics')).toBeInTheDocument()
    expect(screen.getByText('Export PDF Report')).toBeInTheDocument()
    expect(screen.getByText('Export Excel Data')).toBeInTheDocument()
    expect(screen.getByText('Export Raw Data')).toBeInTheDocument()
  })

  it('displays date range selector', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    expect(screen.getByDisplayValue('Last 30 days')).toBeInTheDocument()
  })

  it('shows custom date range inputs when custom is selected', () => {
    render(
      <TestWrapper>
        <AdvancedAnalyticsPage />
      </TestWrapper>
    )

    const dateRangeSelect = screen.getByDisplayValue('Last 30 days')
    fireEvent.change(dateRangeSelect, { target: { value: 'custom' } })

    expect(screen.getByText('Custom Date Range')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('End Date')).toBeInTheDocument()
  })
})