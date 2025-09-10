import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download,
  Edit,
  AlertTriangle,
  FileText
} from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'

// Mock user data - in real app this would come from API
const mockUser = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user',
  createdAt: '2024-01-15T10:30:00Z',
  lastLogin: '2024-09-09T14:25:00Z',
  consentCategories: [
    {
      id: '1',
      name: 'Marketing Communications',
      description: 'Receive promotional emails and marketing materials',
      status: 'granted',
      grantedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-08-20T09:15:00Z'
    },
    {
      id: '2',
      name: 'Analytics Tracking',
      description: 'Allow tracking for website analytics and performance',
      status: 'granted',
      grantedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-07-10T16:45:00Z'
    },
    {
      id: '3',
      name: 'Data Processing',
      description: 'Process personal data for service delivery',
      status: 'granted',
      grantedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-06-15T14:20:00Z'
    },
    {
      id: '4',
      name: 'Third-party Sharing',
      description: 'Share data with trusted third-party partners',
      status: 'withdrawn',
      grantedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-05-10T11:30:00Z'
    },
    {
      id: '5',
      name: 'Location Services',
      description: 'Access location data for personalized services',
      status: 'pending',
      grantedAt: null,
      lastUpdated: '2024-09-08T10:00:00Z'
    }
  ],
  activityHistory: [
    {
      id: '1',
      type: 'consent_granted',
      description: 'Granted consent for Marketing Communications',
      timestamp: '2024-08-20T09:15:00Z'
    },
    {
      id: '2',
      type: 'consent_withdrawn',
      description: 'Withdrew consent for Third-party Sharing',
      timestamp: '2024-05-10T11:30:00Z'
    },
    {
      id: '3',
      type: 'data_export',
      description: 'Requested data export',
      timestamp: '2024-04-15T16:45:00Z'
    },
    {
      id: '4',
      type: 'consent_requested',
      description: 'New consent category requested',
      timestamp: '2024-09-08T10:00:00Z'
    }
  ]
}

export function UserDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'overview' | 'consents' | 'activity'>('overview')

  // In real app, fetch user data based on userId
  const user = mockUser

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'withdrawn':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
    switch (status) {
      case 'granted':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'withdrawn':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'pending':
        return `${baseClasses} bg-orange-100 text-orange-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'consent_granted':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'consent_withdrawn':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'data_export':
        return <Download className="w-4 h-4 text-blue-500" />
      case 'consent_requested':
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const headerActions = (
    <>
      <button
        onClick={() => navigate('/users')}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Users
      </button>
      <button className="btn btn-outline">
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </button>
      <button className="btn btn-primary">
        <Edit className="w-4 h-4 mr-2" />
        Edit User
      </button>
    </>
  )

  return (
    <DashboardLayout 
      title="User Details" 
      subtitle={`${user.firstName} ${user.lastName}`}
      headerActions={headerActions}
    >
      {/* User Info Card */}
      <div className="card mb-8">
        <div className="card-content">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined {formatDate(user.createdAt)}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Last login {formatDate(user.lastLogin)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">User ID</div>
              <div className="font-mono text-sm text-gray-900">{user.id}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Total Consents</p>
                <p className="text-3xl font-bold text-gray-900">{user.consentCategories.length}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Shield className="w-4 h-4 mr-1" />
                  Categories
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Active Consents</p>
                <p className="text-3xl font-bold text-gray-900">
                  {user.consentCategories.filter(c => c.status === 'granted').length}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Granted
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Withdrawn</p>
                <p className="text-3xl font-bold text-gray-900">
                  {user.consentCategories.filter(c => c.status === 'withdrawn').length}
                </p>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <XCircle className="w-4 h-4 mr-1" />
                  Revoked
                </p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-900">
                  {user.consentCategories.filter(c => c.status === 'pending').length}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  Awaiting
                </p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b mb-6">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'consents', name: 'Consents' },
              { id: 'activity', name: 'Activity' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Consent Summary</h3>
                <p className="card-description">Current consent status overview</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {user.consentCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {getStatusIcon(category.status)}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.description}</p>
                        </div>
                      </div>
                      <span className={getStatusBadge(category.status)}>
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recent Activity</h3>
                <p className="card-description">Latest user actions</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {user.activityHistory.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'consents' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Consent Categories</h3>
            <p className="card-description">Detailed consent information</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {user.consentCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {getStatusIcon(category.status)}
                        <h4 className="ml-2 text-lg font-medium text-gray-900">{category.name}</h4>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{category.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        {category.grantedAt && (
                          <span>Granted: {formatDate(category.grantedAt)}</span>
                        )}
                        <span>Updated: {formatDate(category.lastUpdated)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className={getStatusBadge(category.status)}>
                        {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Activity History</h3>
            <p className="card-description">Complete timeline of user actions</p>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {user.activityHistory.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}