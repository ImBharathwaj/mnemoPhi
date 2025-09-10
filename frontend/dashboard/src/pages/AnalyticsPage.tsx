import { useEffect, useState } from 'react'
import { 
  AlertTriangle, 
  RefreshCw,
  Download
} from 'lucide-react'
import { 
  ConsentTrendChart, 
  ConsentCategoryChart, 
  ComplianceMetricsComponent, 
  GeographicDistribution, 
  ReportBuilder 
} from '@mnemophi/shared'
import { useAnalyticsStore } from '@mnemophi/shared'
import { DashboardLayout } from '../components/DashboardLayout'

console.log('AnalyticsPage: Component loaded')
console.log('AnalyticsPage: Available components:', { ConsentTrendChart, ConsentCategoryChart, ComplianceMetricsComponent, GeographicDistribution, ReportBuilder })

export function AnalyticsPage() {
  console.log('AnalyticsPage: Component rendering')
  
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

  console.log('AnalyticsPage: Store state:', { consentTrends, consentCategories, geographicData, complianceMetrics, isLoading, error })

  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Load initial data
    fetchConsentTrends()
    fetchConsentCategories()
    fetchGeographicData()
    fetchComplianceMetrics()
    fetchReportTemplates()
  }, [])

  const handleRefresh = () => {
    fetchConsentTrends()
    fetchConsentCategories()
    fetchGeographicData()
    fetchComplianceMetrics()
    fetchReportTemplates()
  }


  const headerActions = (
    <>
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </button>
      <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>
    </>
  )

  console.log('AnalyticsPage: About to render, isLoading:', isLoading, 'error:', error)

  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      subtitle="Comprehensive insights into user consent and compliance"
      headerActions={headerActions}
    >
      {/* Tab Navigation */}
      <div className="bg-white border-b mb-6">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'trends', name: 'Trends' },
              { id: 'geographic', name: 'Geographic' },
              { id: 'compliance', name: 'Compliance' },
              { id: 'reports', name: 'Reports' }
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

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
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

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading analytics data...</span>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Debug Info */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-semibold mb-2">Debug Info:</h4>
            <p>Consent Trends Data Length: {consentTrends?.length || 0}</p>
            <p>Consent Categories Data Length: {consentCategories?.length || 0}</p>
            <p>Geographic Data Length: {geographicData?.length || 0}</p>
            <p>Compliance Metrics: {complianceMetrics ? 'Available' : 'Not Available'}</p>
            <p>Active Tab: {activeTab}</p>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Consent Trends (Test)</h3>
                  <p>Data points: {consentTrends?.length || 0}</p>
                  {consentTrends && consentTrends.length > 0 && (
                    <p>First data point: {JSON.stringify(consentTrends[0])}</p>
                  )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Consent Categories (Test)</h3>
                  <p>Categories: {consentCategories?.length || 0}</p>
                  {consentCategories && consentCategories.length > 0 && (
                    <p>First category: {JSON.stringify(consentCategories[0])}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Compliance Metrics (Test)</h3>
                  <p>Metrics: {complianceMetrics ? 'Available' : 'Not Available'}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Geographic Data (Test)</h3>
                  <p>Countries: {geographicData?.length || 0}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Trends Tab</h3>
                <p>This is the trends tab content</p>
              </div>
            </div>
          )}

          {activeTab === 'geographic' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Geographic Tab</h3>
                <p>This is the geographic tab content</p>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Compliance Tab</h3>
                <p>This is the compliance tab content</p>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Reports Tab</h3>
                <p>This is the reports tab content</p>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}