import { useAuthStore } from '@mnemophi/shared'
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Plus,
  Users,
  Shield,
  FileText
} from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'

export function DashboardPage() {
  const { user } = useAuthStore()

  console.log('DashboardPage rendering, user:', user)

  const headerActions = (
    <>
      <button className="btn btn-primary">
        <Plus className="w-4 h-4 mr-2" />
        Add Consent Category
      </button>
    </>
  )

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={`Welcome back, ${user?.firstName || 'User'}!`}
      headerActions={headerActions}
    >
      <div className="p-4">
        <p className="text-gray-600">If you can see this, the component is working.</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-8">
          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">2,847</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-14 h-14 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500">Consent Categories</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <Shield className="w-4 h-4 mr-1" />
                    Active categories
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
                  <p className="text-sm font-medium text-gray-500">Compliance Rate</p>
                  <p className="text-3xl font-bold text-gray-900">94.2%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Above target
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
                  <p className="text-sm font-medium text-gray-500">Withdrawal Requests</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-yellow-600 flex items-center mt-1">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Pending review
                  </p>
                </div>
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple content to test */}
        <div className="card">
          <div className="card-content">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New consent granted</p>
                  <p className="text-sm text-gray-500">User John Doe granted marketing consent</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  2 minutes ago
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Preference updated</p>
                  <p className="text-sm text-gray-500">User Jane Smith updated communication preferences</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  15 minutes ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}