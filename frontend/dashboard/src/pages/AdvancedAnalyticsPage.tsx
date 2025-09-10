import { useState, useEffect } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download, 
  AlertTriangle,
  RefreshCw,
  Share2
} from 'lucide-react'
import { 
  ConsentTrendChart, 
  ConsentCategoryChart, 
  ComplianceMetricsComponent, 
  GeographicDistribution, 
  ReportBuilder 
} from '@mnemophi/shared'
import { useAnalyticsStore } from '@mnemophi/shared'

export function AdvancedAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30d')
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  })

  // Use the analytics store
  const {
    consentTrends,
    consentCategories,
    geographicData,
    complianceMetrics,
    isLoading,
    error,
    fetchConsentTrends,
    fetchConsentCategories,
    fetchGeographicData,
    fetchComplianceMetrics,
    fetchReportTemplates,
    clearError
  } = useAnalyticsStore()

  useEffect(() => {
    // Load initial data
    fetchConsentTrends()
    fetchConsentCategories()
    fetchGeographicData()
    fetchComplianceMetrics()
    fetchReportTemplates()
  }, [fetchConsentTrends, fetchConsentCategories, fetchGeographicData, fetchComplianceMetrics, fetchReportTemplates])

  // Mock data for advanced analytics
  const advancedMetrics = {
    totalUsers: 2847,
    activeConsents: 18923,
    complianceRate: 94.2,
    riskScore: 2.1
  }

  const handleExport = (format: string) => {
    console.log(`Exporting analytics data in ${format} format`)
    // Implement export functionality
  }

  const handleShare = () => {
    console.log('Sharing analytics dashboard')
    // Implement sharing functionality
  }

  const handleRefresh = () => {
    fetchConsentTrends()
    fetchConsentCategories()
    fetchGeographicData()
    fetchComplianceMetrics()
    fetchReportTemplates()
  }

  return (
    <DashboardLayout title="Analytics" subtitle="Comprehensive insights and predictive analytics for consent management">
      <div className="space-y-6">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={clearError}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading analytics data...</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600 mt-1">
                  Comprehensive insights and predictive analytics for consent management
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="btn btn-outline"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={handleShare}
                  className="btn btn-outline"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <div className="relative">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="btn btn-outline"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                    <option value="custom">Custom range</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Date Range */}
        {dateRange === 'custom' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Date Range</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white border-b mb-6">
          <div className="px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'trends', name: 'Trends' },
                { id: 'geographic', name: 'Geographic' },
                { id: 'compliance', name: 'Compliance' },
                { id: 'reports', name: 'Reports' },
                { id: 'advanced', name: 'Predictive' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {!isLoading && (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Analytics Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                            <dd className="text-lg font-medium text-gray-900">{advancedMetrics.totalUsers.toLocaleString()}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Active Consents</dt>
                            <dd className="text-lg font-medium text-gray-900">{advancedMetrics.activeConsents.toLocaleString()}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <PieChart className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Compliance Rate</dt>
                            <dd className="text-lg font-medium text-gray-900">{advancedMetrics.complianceRate}%</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Risk Score</dt>
                            <dd className="text-lg font-medium text-gray-900">{advancedMetrics.riskScore}/10</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-600">2,847</div>
                        <div className="text-sm text-gray-500">Total Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">94.2%</div>
                        <div className="text-sm text-gray-500">Compliance Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">18,923</div>
                        <div className="text-sm text-gray-500">Active Consents</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Consent Trends</h3>
                  {consentTrends && consentTrends.length > 0 ? (
                    <ConsentTrendChart data={consentTrends} />
                  ) : (
                    <p className="text-gray-500">No trend data available</p>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Consent Categories</h3>
                  {consentCategories && consentCategories.length > 0 ? (
                    <ConsentCategoryChart data={consentCategories} />
                  ) : (
                    <p className="text-gray-500">No category data available</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'geographic' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
                  {geographicData && geographicData.length > 0 ? (
                    <GeographicDistribution data={geographicData} />
                  ) : (
                    <p className="text-gray-500">No geographic data available</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Compliance Metrics</h3>
                  {complianceMetrics ? (
                    <ComplianceMetricsComponent data={complianceMetrics} />
                  ) : (
                    <p className="text-gray-500">No compliance data available</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Report Builder</h3>
                  <ReportBuilder 
                    templates={[]}
                    onGenerateReport={() => {}}
                    onSaveTemplate={() => {}}
                  />
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                {/* Advanced Analytics Content */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Analytics</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Consent Forecast</h4>
                        <p className="text-sm text-gray-600">AI-powered predictions for consent trends</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Risk Assessment</h4>
                        <p className="text-sm text-gray-600">Automated compliance risk analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Export Options */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Export Analytics</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleExport('pdf')}
                className="btn btn-outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF Report
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="btn btn-outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Excel Data
              </button>
              <button
                onClick={() => handleExport('json')}
                className="btn btn-outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Raw Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}