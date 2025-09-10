import { useState } from 'react'
import { UserPortalLayout } from '../components/UserPortalLayout'
import { 
  Download, 
  Trash2, 
  FileText, 
  Database, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Info,
  Archive,
  Eye,
  Shield
} from 'lucide-react'

export function DataManagementPage() {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mock data for demonstration
  const dataCategories = [
    {
      id: 'profile',
      name: 'Profile Information',
      description: 'Personal details, contact information, and account settings',
      size: '2.3 KB',
      lastUpdated: '2024-01-15T10:30:00Z',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'consent',
      name: 'Consent Records',
      description: 'All consent decisions and privacy preferences',
      size: '1.8 KB',
      lastUpdated: '2024-01-15T10:30:00Z',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      id: 'activity',
      name: 'Activity Logs',
      description: 'Login history, actions, and system interactions',
      size: '15.2 KB',
      lastUpdated: '2024-01-15T10:30:00Z',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      id: 'analytics',
      name: 'Usage Analytics',
      description: 'Platform usage data and performance metrics',
      size: '8.7 KB',
      lastUpdated: '2024-01-15T10:30:00Z',
      icon: Database,
      color: 'text-orange-600'
    }
  ]

  const exportHistory = [
    {
      id: '1',
      format: 'JSON',
      size: '28.0 KB',
      date: '2024-01-10T14:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      format: 'CSV',
      size: '12.5 KB',
      date: '2024-01-05T09:15:00Z',
      status: 'completed'
    },
    {
      id: '3',
      format: 'PDF',
      size: '2.1 MB',
      date: '2023-12-20T16:45:00Z',
      status: 'completed'
    }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      alert(`Data exported successfully in ${selectedFormat.toUpperCase()} format!`)
    }, 2000)
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsDeleting(true)
      // Simulate deletion process
      setTimeout(() => {
        setIsDeleting(false)
        alert('Account deletion request submitted. You will receive a confirmation email.')
      }, 2000)
    }
  }

  return (
    <UserPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
                <p className="text-gray-600 mt-1">
                  Export your data or request account deletion
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary-600" />
                <span className="text-sm font-medium text-gray-900">Total Data: 28.0 KB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Export Your Data
            </h3>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Export Options */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Export Format</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="json"
                      checked={selectedFormat === 'json'}
                      onChange={(e) => setSelectedFormat(e.target.value as any)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">JSON</div>
                      <div className="text-sm text-gray-500">Machine-readable format, includes all data</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={selectedFormat === 'csv'}
                      onChange={(e) => setSelectedFormat(e.target.value as any)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">CSV</div>
                      <div className="text-sm text-gray-500">Spreadsheet format, good for analysis</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={selectedFormat === 'pdf'}
                      onChange={(e) => setSelectedFormat(e.target.value as any)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">PDF</div>
                      <div className="text-sm text-gray-500">Human-readable report format</div>
                    </div>
                  </label>
                </div>
                
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="mt-6 w-full btn btn-primary"
                >
                  {isExporting ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </>
                  )}
                </button>
              </div>

              {/* Data Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Data Categories</h4>
                <div className="space-y-3">
                  {dataCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Icon className={`h-5 w-5 ${category.color} mr-3`} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            <div className="text-xs text-gray-500">{category.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{category.size}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(category.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export History */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Export History
            </h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {exportHistory.map((export_) => (
                    <tr key={export_.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {export_.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {export_.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(export_.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {export_.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Account Deletion */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Account Deletion
            </h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Permanent Account Deletion</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Deleting your account will permanently remove all your data, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>All personal information and profile data</li>
                      <li>Consent records and privacy preferences</li>
                      <li>Activity logs and usage history</li>
                      <li>Any exported data files</li>
                    </ul>
                    <p className="mt-2 font-medium">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Delete My Account</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="btn btn-danger"
              >
                {isDeleting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Data Rights Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Your Data Rights</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>You have the right to access all personal data we hold about you</li>
                  <li>You can request data portability in a machine-readable format</li>
                  <li>You can request correction of inaccurate personal data</li>
                  <li>You have the right to request deletion of your personal data</li>
                  <li>Data exports are typically processed within 30 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPortalLayout>
  )
}