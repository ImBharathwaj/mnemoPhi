import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@mnemophi/shared'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Shield, 
  FileText,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  headerActions?: React.ReactNode
}

export function DashboardLayout({ children, title, subtitle, headerActions }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  console.log('DashboardLayout rendering, user:', user)
  console.log('Current pathname:', location.pathname)

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/users', label: 'Users', icon: Users },
    { path: '/consents', label: 'Consents', icon: Shield },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/system', label: 'System Config', icon: Settings },
    { path: '/settings', label: 'Settings', icon: Settings }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col fixed left-0 top-0 h-screen z-10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">MnemoPhi</h2>
          <p className="text-sm text-gray-600">Business Dashboard</p>
        </div>
        
        <nav className="mt-6 flex-1">
          <div className="px-3">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mt-1 w-full text-left transition-colors ${
                  isActive(item.path)
                    ? 'text-white bg-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile Section - Moved to bottom */}
        <div className="p-3 border-t border-gray-200">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.firstName || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 w-full text-left text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                  {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {headerActions && (
                  <div className="flex items-center space-x-3">
                    {headerActions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}