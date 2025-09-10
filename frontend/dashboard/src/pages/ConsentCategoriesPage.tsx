import { useState } from 'react'
import { 
  Search, 
  Download, 
  Plus, 
  Shield, 
  CheckCircle, 
  Clock,
  MoreVertical,
  Edit,
  Eye,
  Settings
} from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'
import { Modal } from '../components/Modal'
import { ConsentCategoryForm } from '../components/ConsentCategoryForm'

// Mock consent categories data - in real app this would come from API
const mockCategories = [
  {
    id: '1',
    name: 'Marketing Communications',
    description: 'Receive promotional emails, newsletters, and marketing materials',
    isRequired: false,
    isActive: true,
    userCount: 1247,
    grantedCount: 892,
    withdrawnCount: 123,
    pendingCount: 232,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-08-20T09:15:00Z'
  },
  {
    id: '2',
    name: 'Analytics Tracking',
    description: 'Allow tracking for website analytics and performance monitoring',
    isRequired: true,
    isActive: true,
    userCount: 1247,
    grantedCount: 1156,
    withdrawnCount: 45,
    pendingCount: 46,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-07-10T16:45:00Z'
  },
  {
    id: '3',
    name: 'Data Processing',
    description: 'Process personal data for service delivery and functionality',
    isRequired: true,
    isActive: true,
    userCount: 1247,
    grantedCount: 1189,
    withdrawnCount: 23,
    pendingCount: 35,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-06-15T14:20:00Z'
  },
  {
    id: '4',
    name: 'Third-party Sharing',
    description: 'Share data with trusted third-party partners and service providers',
    isRequired: false,
    isActive: true,
    userCount: 1247,
    grantedCount: 567,
    withdrawnCount: 234,
    pendingCount: 446,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-05-10T11:30:00Z'
  },
  {
    id: '5',
    name: 'Location Services',
    description: 'Access location data for personalized services and recommendations',
    isRequired: false,
    isActive: true,
    userCount: 1247,
    grantedCount: 445,
    withdrawnCount: 123,
    pendingCount: 679,
    createdAt: '2024-02-20T09:15:00Z',
    lastUpdated: '2024-08-15T16:45:00Z'
  },
  {
    id: '6',
    name: 'Biometric Data',
    description: 'Collect and process biometric data for authentication',
    isRequired: false,
    isActive: false,
    userCount: 0,
    grantedCount: 0,
    withdrawnCount: 0,
    pendingCount: 0,
    createdAt: '2024-03-10T14:20:00Z',
    lastUpdated: '2024-03-10T14:20:00Z'
  }
]

export function ConsentCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const filteredCategories = mockCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && category.isActive) ||
                         (statusFilter === 'inactive' && !category.isActive) ||
                         (statusFilter === 'required' && category.isRequired)
    
    return matchesSearch && matchesStatus
  })

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'userCount':
        return b.userCount - a.userCount
      case 'grantedCount':
        return b.grantedCount - a.grantedCount
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getConsentRate = (granted: number, total: number) => {
    if (total === 0) return 0
    return Math.round((granted / total) * 100)
  }

  const getStatusBadge = (isActive: boolean, isRequired: boolean) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
    if (!isActive) {
      return `${baseClasses} bg-gray-100 text-gray-800`
    }
    if (isRequired) {
      return `${baseClasses} bg-blue-100 text-blue-800`
    }
    return `${baseClasses} bg-green-100 text-green-800`
  }

  const getStatusText = (isActive: boolean, isRequired: boolean) => {
    if (!isActive) return 'Inactive'
    if (isRequired) return 'Required'
    return 'Optional'
  }

  const handleCreateCategory = async (data: any) => {
    setIsCreating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Creating consent category:', data)
      
      // In a real app, you would call your API here
      // await createConsentCategory(data)
      
      // Close modal and show success message
      setShowCreateModal(false)
      // You could add a toast notification here
      alert('Consent category created successfully!')
    } catch (error) {
      console.error('Error creating consent category:', error)
      alert('Error creating consent category. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const headerActions = (
    <>
      <button className="btn btn-outline">
        <Download className="w-4 h-4 mr-2" />
        Export
      </button>
      <button 
        onClick={() => setShowCreateModal(true)}
        className="btn btn-primary"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </button>
    </>
  )

  return (
    <DashboardLayout 
      title="Consent Categories" 
      subtitle={`${sortedCategories.length} categories`}
      headerActions={headerActions}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Total Categories</p>
                <p className="text-3xl font-bold text-gray-900">{mockCategories.length}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Shield className="w-4 h-4 mr-1" />
                  All categories
                </p>
              </div>
              <div className="w-14 h-14 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Active Categories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockCategories.filter(c => c.isActive).length}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Currently active
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
                <p className="text-sm font-medium text-gray-500">Required Categories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockCategories.filter(c => c.isRequired).length}
                </p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Settings className="w-4 h-4 mr-1" />
                  Mandatory
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card h-32">
          <div className="card-content h-full">
            <div className="flex justify-between h-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500">Avg Consent Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(
                    mockCategories
                      .filter(c => c.isActive)
                      .reduce((acc, c) => acc + getConsentRate(c.grantedCount, c.userCount), 0) /
                    mockCategories.filter(c => c.isActive).length
                  )}%
                </p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  Overall rate
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
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
              <option value="inactive">Inactive</option>
              <option value="required">Required</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name">Name</option>
              <option value="userCount">User Count</option>
              <option value="grantedCount">Granted Count</option>
              <option value="createdAt">Created Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consent Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No categories found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                sortedCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500">{category.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(category.isActive, category.isRequired)}>
                        {getStatusText(category.isActive, category.isRequired)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.userCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="font-medium">
                          {getConsentRate(category.grantedCount, category.userCount)}%
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full" 
                            style={{ 
                              width: `${getConsentRate(category.grantedCount, category.userCount)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(category.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-primary-600 hover:text-primary-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit Category"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Category Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Consent Category"
        size="sm"
      >
        <ConsentCategoryForm
          onSubmit={handleCreateCategory}
          onCancel={() => setShowCreateModal(false)}
          isLoading={isCreating}
        />
      </Modal>
    </DashboardLayout>
  )
}