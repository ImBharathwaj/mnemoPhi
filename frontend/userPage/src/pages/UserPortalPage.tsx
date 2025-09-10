import { useAuthStore, useConsentStore } from '@mnemophi/shared'
import { UserPortalLayout } from '../components/UserPortalLayout'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Settings, 
  FileText, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Users,
  AlertTriangle
} from 'lucide-react'

export function UserPortalPage() {
  const { user } = useAuthStore()
  const { userConsents, categories } = useConsentStore()

  // Mock data for demonstration
  const mockConsentData = {
    totalConsents: 8,
    activeConsents: 6,
    pendingConsents: 1,
    withdrawnConsents: 1,
    privacyScore: 85,
    lastUpdated: '2024-01-15T10:30:00Z'
  }

  const recentActivities = [
    {
      id: 1,
      type: 'consent_granted',
      description: 'Granted consent for Marketing Communications',
      timestamp: '2024-01-15T10:30:00Z',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'consent_withdrawn',
      description: 'Withdrew consent for Third-Party Sharing',
      timestamp: '2024-01-14T15:45:00Z',
      icon: XCircle,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'profile_updated',
      description: 'Updated profile information',
      timestamp: '2024-01-13T09:20:00Z',
      icon: Settings,
      color: 'text-blue-600'
    }
  ]

  return (
    <UserPortalLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-gray-600">
              You have full control over your data and privacy preferences. 
              Review your consent status and manage your privacy settings.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Consents</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockConsentData.activeConsents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockConsentData.pendingConsents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Privacy Score</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockConsentData.privacyScore}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
                    <dd className="text-lg font-medium text-gray-900">{mockConsentData.totalConsents}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/portal/consent"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Consent Management</h3>
                  <p className="text-sm text-gray-500">Manage your consent preferences</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/portal/profile"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Profile Settings</h3>
                  <p className="text-sm text-gray-500">Update your profile information</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/portal/privacy"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Privacy Settings</h3>
                  <p className="text-sm text-gray-500">Configure privacy preferences</p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/portal/data"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Download className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Data Management</h3>
                  <p className="text-sm text-gray-500">Export or delete your data</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => {
                  const Icon = activity.icon
                  return (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.color}`}>
                              <Icon className="h-5 w-5" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activity.timestamp}>
                                {new Date(activity.timestamp).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Privacy Reminder</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You have 1 pending consent request that requires your attention. 
                  <Link to="/portal/consent" className="font-medium underline text-yellow-800 hover:text-yellow-900">
                    Review now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPortalLayout>
  )
}