import { useAuthStore } from '@mnemophi/shared'
import { Shield, Settings, FileText, Download } from 'lucide-react'

export function UserPortalPage() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MnemoPhi User Portal</h1>
              <p className="text-gray-600">Manage your data preferences and consent</p>
            </div>
            <button
              onClick={logout}
              className="btn btn-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="card mb-8">
            <div className="card-content">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome, {user?.firstName || 'User'}!
              </h2>
              <p className="text-gray-600">
                You have full control over your data and privacy preferences. 
                Review and manage your consent settings below.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Privacy Settings</h3>
                    <p className="text-sm text-gray-500">Manage your data preferences</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Account Settings</h3>
                    <p className="text-sm text-gray-500">Update your profile information</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Data Report</h3>
                    <p className="text-sm text-gray-500">Download your data summary</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Download className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
                    <p className="text-sm text-gray-500">Download all your data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consent Management */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Consent Management</h3>
              <p className="card-description">Review and update your consent preferences</p>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics & Tracking</h4>
                    <p className="text-sm text-gray-600">Help improve our services with usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Third-Party Sharing</h4>
                    <p className="text-sm text-gray-600">Share data with trusted partners</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}