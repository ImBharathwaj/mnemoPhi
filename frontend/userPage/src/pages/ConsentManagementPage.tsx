import { useState } from 'react'
import { useConsentStore } from '@mnemophi/shared'
import { UserPortalLayout } from '../components/UserPortalLayout'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Info, 
  AlertTriangle,
  History,
  Download,
  Search,
  Filter
} from 'lucide-react'

export function ConsentManagementPage() {
  const { userConsents, categories, updateConsent } = useConsentStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'withdrawn' | 'pending'>('all')

  // Mock consent data for demonstration
  const mockConsents = [
    {
      id: '1',
      categoryId: '1',
      categoryName: 'Marketing Communications',
      description: 'Receive promotional emails, newsletters, and marketing updates',
      granted: true,
      timestamp: '2024-01-15T10:30:00Z',
      required: false,
      impact: 'You will receive promotional content and special offers'
    },
    {
      id: '2',
      categoryId: '2',
      categoryName: 'Analytics & Tracking',
      description: 'Help improve our services with usage analytics and performance data',
      granted: false,
      timestamp: '2024-01-14T15:45:00Z',
      required: false,
      impact: 'We can analyze how you use our services to improve them'
    },
    {
      id: '3',
      categoryId: '3',
      categoryName: 'Third-Party Sharing',
      description: 'Share data with trusted partners for service delivery',
      granted: false,
      timestamp: '2024-01-13T09:20:00Z',
      required: false,
      impact: 'Your data may be shared with service providers and partners'
    },
    {
      id: '4',
      categoryId: '4',
      categoryName: 'Essential Services',
      description: 'Required for basic platform functionality and security',
      granted: true,
      timestamp: '2024-01-10T08:00:00Z',
      required: true,
      impact: 'Required for account security and basic platform features'
    },
    {
      id: '5',
      categoryId: '5',
      categoryName: 'Personalization',
      description: 'Customize your experience based on your preferences',
      granted: true,
      timestamp: '2024-01-12T14:15:00Z',
      required: false,
      impact: 'We can personalize content and recommendations for you'
    },
    {
      id: '6',
      categoryId: '6',
      categoryName: 'Research & Development',
      description: 'Use anonymized data for product research and development',
      granted: false,
      timestamp: '2024-01-11T11:30:00Z',
      required: false,
      impact: 'Anonymized data may be used for research and product improvement'
    }
  ]

  const filteredConsents = mockConsents.filter(consent => {
    const matchesSearch = consent.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consent.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && consent.granted) ||
                         (filterStatus === 'withdrawn' && !consent.granted && !consent.required) ||
                         (filterStatus === 'pending' && !consent.granted && !consent.required)
    
    return matchesSearch && matchesFilter
  })

  const handleConsentToggle = (consentId: string, granted: boolean) => {
    updateConsent(consentId, granted)
  }

  const getStatusIcon = (consent: any) => {
    if (consent.required) {
      return <CheckCircle className="h-5 w-5 text-blue-600" />
    }
    return consent.granted ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <XCircle className="h-5 w-5 text-red-600" />
  }

  const getStatusText = (consent: any) => {
    if (consent.required) return 'Required'
    return consent.granted ? 'Active' : 'Withdrawn'
  }

  const getStatusColor = (consent: any) => {
    if (consent.required) return 'bg-blue-100 text-blue-800'
    return consent.granted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <UserPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consent Management</h1>
                <p className="text-gray-600 mt-1">
                  Review and manage your consent preferences for data processing activities
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="btn btn-outline">
                  <History className="h-4 w-4 mr-2" />
                  View History
                </button>
                <button className="btn btn-outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search consent categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Consents</option>
                  <option value="active">Active</option>
                  <option value="withdrawn">Withdrawn</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Categories */}
        <div className="space-y-4">
          {filteredConsents.map((consent) => (
            <div key={consent.id} className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(consent)}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {consent.categoryName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consent)}`}>
                          {getStatusText(consent)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {consent.description}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Info className="h-4 w-4 mr-1" />
                      <span>{consent.impact}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Last updated: {new Date(consent.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="ml-6 flex-shrink-0">
                    {consent.required ? (
                      <div className="flex items-center text-sm text-blue-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Required
                      </div>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={consent.granted}
                          onChange={(e) => handleConsentToggle(consent.id, e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredConsents.length === 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-12 sm:p-6 text-center">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No consents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">About Consent Management</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>You can withdraw consent at any time, except for essential services</li>
                  <li>Withdrawing consent may limit certain features and services</li>
                  <li>Changes to consent preferences are logged and timestamped</li>
                  <li>Required consents are necessary for basic platform functionality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPortalLayout>
  )
}