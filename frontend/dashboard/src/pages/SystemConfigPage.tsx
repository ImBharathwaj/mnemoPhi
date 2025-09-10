import { useState } from 'react'
import { DashboardLayout } from '../components/DashboardLayout'
import { 
  Key, 
  Settings, 
  Activity, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

export function SystemConfigPage() {
  const [activeTab, setActiveTab] = useState('api-keys')
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [showApiKey, setShowApiKey] = useState<{ [key: string]: boolean }>({})
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([])

  // Mock data for API keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk-prod-1234567890abcdef',
      permissions: ['read', 'write', 'admin'],
      lastUsed: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      status: 'active',
      usage: {
        requests: 15420,
        limit: 100000,
        resetDate: '2024-02-01T00:00:00Z'
      }
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk-dev-abcdef1234567890',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-14T15:45:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      status: 'active',
      usage: {
        requests: 8920,
        limit: 50000,
        resetDate: '2024-02-01T00:00:00Z'
      }
    },
    {
      id: '3',
      name: 'Analytics API Key',
      key: 'sk-analytics-9876543210fedcba',
      permissions: ['read'],
      lastUsed: '2024-01-10T09:20:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      status: 'inactive',
      usage: {
        requests: 2340,
        limit: 10000,
        resetDate: '2024-02-01T00:00:00Z'
      }
    }
  ])

  // Mock audit logs
  const [auditLogs] = useState([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'admin@mnemophi.com',
      action: 'API_KEY_CREATED',
      resource: 'API Key',
      resourceId: 'sk-prod-1234567890abcdef',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: { name: 'Production API Key', permissions: ['read', 'write', 'admin'] }
    },
    {
      id: '2',
      timestamp: '2024-01-15T09:15:00Z',
      user: 'admin@mnemophi.com',
      action: 'SETTINGS_UPDATED',
      resource: 'System Settings',
      resourceId: 'privacy-settings',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: { setting: 'data_retention_period', oldValue: '365', newValue: '730' }
    },
    {
      id: '3',
      timestamp: '2024-01-14T16:20:00Z',
      user: 'user@example.com',
      action: 'CONSENT_WITHDRAWN',
      resource: 'User Consent',
      resourceId: 'consent-123',
      ipAddress: '203.0.113.42',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      details: { category: 'marketing', userId: 'user-456' }
    }
  ])

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    dataRetentionPeriod: 730,
    consentExpirationPeriod: 365,
    auditLogRetention: 2555,
    maxApiRequestsPerHour: 1000,
    enableTwoFactorAuth: true,
    requireStrongPasswords: true,
    enableAuditLogging: true,
    enableDataEncryption: true,
    backupFrequency: 'daily',
    notificationEmail: 'admin@mnemophi.com'
  })

  const availablePermissions = [
    { id: 'read', name: 'Read Access', description: 'View data and analytics' },
    { id: 'write', name: 'Write Access', description: 'Create and update records' },
    { id: 'admin', name: 'Admin Access', description: 'Full system administration' },
    { id: 'analytics', name: 'Analytics Access', description: 'Access to analytics data only' }
  ]

  const handleGenerateKey = async () => {
    if (!newKeyName.trim()) return
    
    setIsGeneratingKey(true)
    
    // Simulate API call
    setTimeout(() => {
      const newKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        permissions: newKeyPermissions,
        lastUsed: '',
        createdAt: new Date().toISOString(),
        status: 'active',
        usage: {
          requests: 0,
          limit: 100000,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
      
      setApiKeys(prev => [newKey, ...prev])
      setNewKeyName('')
      setNewKeyPermissions([])
      setIsGeneratingKey(false)
    }, 1000)
  }

  const handleDeleteKey = (keyId: string) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(prev => prev.filter(key => key.id !== keyId))
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    // You could add a toast notification here
  }

  const handleToggleKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const handleSettingChange = (key: string, value: any) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleExportLogs = () => {
    console.log('Exporting audit logs...')
    // Implement export functionality
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes('CREATE') || action.includes('UPDATE')) return 'text-green-600'
    if (action.includes('DELETE') || action.includes('WITHDRAW')) return 'text-red-600'
    return 'text-blue-600'
  }

  return (
    <DashboardLayout title="System Configuration" subtitle="Manage API keys, system settings, and audit logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">System Configuration</h1>
                <p className="text-gray-600 mt-1">
                  Manage API keys, system settings, and audit logs
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="btn btn-outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Config
                </button>
                <button className="btn btn-outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Config
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'api-keys', name: 'API Keys', icon: Key },
                { id: 'settings', name: 'System Settings', icon: Settings },
                { id: 'audit-logs', name: 'Audit Logs', icon: Activity }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* API Keys Tab */}
            {activeTab === 'api-keys' && (
              <div className="space-y-6">
                {/* Create New API Key */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Create New API Key</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Key Name</label>
                      <input
                        type="text"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="Enter a descriptive name"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Permissions</label>
                      <div className="mt-1 space-y-2">
                        {availablePermissions.map((permission) => (
                          <label key={permission.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newKeyPermissions.includes(permission.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewKeyPermissions(prev => [...prev, permission.id])
                                } else {
                                  setNewKeyPermissions(prev => prev.filter(p => p !== permission.id))
                                }
                              }}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                              <div className="text-xs text-gray-500">{permission.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleGenerateKey}
                      disabled={isGeneratingKey || !newKeyName.trim()}
                      className="btn btn-primary"
                    >
                      {isGeneratingKey ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Generate API Key
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* API Keys List */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>
                  <div className="space-y-4">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h4 className="text-sm font-medium text-gray-900">{apiKey.name}</h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                                {apiKey.status}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {showApiKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••'}
                              </code>
                              <button
                                onClick={() => handleToggleKeyVisibility(apiKey.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {showApiKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                              <button
                                onClick={() => handleCopyKey(apiKey.key)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                              <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                              {apiKey.lastUsed && (
                                <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                              )}
                              <span>Usage: {apiKey.usage.requests.toLocaleString()}/{apiKey.usage.limit.toLocaleString()}</span>
                            </div>
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {apiKey.permissions.map((permission) => (
                                  <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {permission}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="btn btn-outline btn-sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteKey(apiKey.id)}
                              className="btn btn-outline btn-sm text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* System Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Data Retention Period (days)</label>
                        <input
                          type="number"
                          value={systemSettings.dataRetentionPeriod}
                          onChange={(e) => handleSettingChange('dataRetentionPeriod', parseInt(e.target.value))}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Consent Expiration Period (days)</label>
                        <input
                          type="number"
                          value={systemSettings.consentExpirationPeriod}
                          onChange={(e) => handleSettingChange('consentExpirationPeriod', parseInt(e.target.value))}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Audit Log Retention (days)</label>
                        <input
                          type="number"
                          value={systemSettings.auditLogRetention}
                          onChange={(e) => handleSettingChange('auditLogRetention', parseInt(e.target.value))}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-500">Require 2FA for all admin users</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemSettings.enableTwoFactorAuth}
                            onChange={(e) => handleSettingChange('enableTwoFactorAuth', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Strong Passwords</div>
                          <div className="text-sm text-gray-500">Enforce complex password requirements</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemSettings.requireStrongPasswords}
                            onChange={(e) => handleSettingChange('requireStrongPasswords', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Audit Logging</div>
                          <div className="text-sm text-gray-500">Log all system activities</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemSettings.enableAuditLogging}
                            onChange={(e) => handleSettingChange('enableAuditLogging', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit-logs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Audit Logs</h3>
                  <button
                    onClick={handleExportLogs}
                    className="btn btn-outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resource
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP Address
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`text-sm font-medium ${getActionColor(log.action)}`}>
                                {log.action.replace(/_/g, ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {log.resource}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {log.ipAddress}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}