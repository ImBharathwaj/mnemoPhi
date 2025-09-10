import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Download, 
  Plus, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  Eye,
  Edit
} from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'

// Mock users data - in real app this would come from API
const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-09-09T14:25:00Z',
    consentStats: {
      total: 5,
      granted: 3,
      withdrawn: 1,
      pending: 1
    }
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'user',
    createdAt: '2024-02-20T09:15:00Z',
    lastLogin: '2024-09-08T16:45:00Z',
    consentStats: {
      total: 8,
      granted: 6,
      withdrawn: 2,
      pending: 0
    }
  },
  {
    id: '3',
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'user',
    createdAt: '2024-03-10T14:20:00Z',
    lastLogin: '2024-09-07T11:30:00Z',
    consentStats: {
      total: 3,
      granted: 0,
      withdrawn: 3,
      pending: 0
    }
  },
  {
    id: '4',
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'user',
    createdAt: '2024-04-05T08:45:00Z',
    lastLogin: '2024-09-09T09:15:00Z',
    consentStats: {
      total: 7,
      granted: 5,
      withdrawn: 1,
      pending: 1
    }
  },
  {
    id: '5',
    email: 'david.brown@example.com',
    firstName: 'David',
    lastName: 'Brown',
    role: 'user',
    createdAt: '2024-05-12T16:30:00Z',
    lastLogin: '2024-09-06T13:20:00Z',
    consentStats: {
      total: 4,
      granted: 2,
      withdrawn: 0,
      pending: 2
    }
  }
]

export function UsersPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('lastLogin')

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.consentStats.granted > 0) ||
                         (statusFilter === 'withdrawn' && user.consentStats.withdrawn > 0) ||
                         (statusFilter === 'pending' && user.consentStats.pending > 0)
    
    return matchesSearch && matchesStatus
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      case 'email':
        return a.email.localeCompare(b.email)
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'lastLogin':
      default:
        return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime()
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getConsentStatus = (stats: any) => {
    if (stats.pending > 0) return 'pending'
    if (stats.withdrawn > 0) return 'withdrawn'
    if (stats.granted > 0) return 'active'
    return 'inactive'
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'withdrawn':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'pending':
        return `${baseClasses} bg-orange-100 text-orange-800`
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'withdrawn':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const headerActions = (
    <>
      <button className="btn btn-outline">
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>
      <button className="btn btn-primary">
        <Plus className="w-4 h-4 mr-2" />
        Add User
      </button>
    </>
  )

  return (
    <DashboardLayout 
      title="Users" 
      subtitle={`${sortedUsers.length} users`}
      headerActions={headerActions}
    >
      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="lastLogin">Last Login</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="createdAt">Join Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consent Ratio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => {
                  const status = getConsentStatus(user.consentStats)
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(status)}
                          <span className={`ml-2 ${getStatusBadge(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="font-medium">
                            {user.consentStats.granted}/{user.consentStats.total}
                          </span>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full" 
                              style={{ 
                                width: `${(user.consentStats.granted / user.consentStats.total) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/users/${user.id}`)}
                            className="text-primary-600 hover:text-primary-900"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More Options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}