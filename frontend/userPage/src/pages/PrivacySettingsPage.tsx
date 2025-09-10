import { useState } from 'react'
import { UserPortalLayout } from '../components/UserPortalLayout'
import { 
  Shield, 
  Eye, 
  Lock, 
  Globe, 
  Database, 
  Users, 
  Bell, 
  Download,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
  Edit
} from 'lucide-react'

export function PrivacySettingsPage() {
  const [privacyLevel, setPrivacyLevel] = useState<'minimal' | 'balanced' | 'maximum'>('balanced')
  const [settings, setSettings] = useState({
    dataCollection: true,
    analytics: false,
    marketing: false,
    thirdPartySharing: false,
    personalization: true,
    locationTracking: false,
    cookieConsent: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  })

  // Add error boundary and debugging
  console.log('PrivacySettingsPage rendering...')

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePrivacyLevelChange = (level: 'minimal' | 'balanced' | 'maximum') => {
    setPrivacyLevel(level)
    
    // Apply preset settings based on privacy level
    switch (level) {
      case 'minimal':
        setSettings({
          dataCollection: true,
          analytics: true,
          marketing: true,
          thirdPartySharing: true,
          personalization: true,
          locationTracking: true,
          cookieConsent: true,
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true
        })
        break
      case 'balanced':
        setSettings({
          dataCollection: true,
          analytics: false,
          marketing: false,
          thirdPartySharing: false,
          personalization: true,
          locationTracking: false,
          cookieConsent: true,
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true
        })
        break
      case 'maximum':
        setSettings({
          dataCollection: true,
          analytics: false,
          marketing: false,
          thirdPartySharing: false,
          personalization: false,
          locationTracking: false,
          cookieConsent: true,
          emailNotifications: false,
          smsNotifications: false,
          pushNotifications: false
        })
        break
    }
  }

  // Simplified data structures to avoid potential rendering issues
  const privacyPresets = [
    {
      id: 'minimal',
      name: 'Minimal Privacy',
      description: 'Allow most data collection for enhanced experience',
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'balanced',
      name: 'Balanced Privacy',
      description: 'Balance privacy and functionality (Recommended)',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'maximum',
      name: 'Maximum Privacy',
      description: 'Minimize data collection to essential only',
      icon: Lock,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ]

  const dataRights = [
    {
      id: 'access',
      title: 'Right to Access',
      description: 'Request a copy of all personal data we hold about you',
      icon: Eye,
      action: 'Request Data Copy'
    },
    {
      id: 'rectification',
      title: 'Right to Rectification',
      description: 'Correct inaccurate or incomplete personal data',
      icon: Edit,
      action: 'Update Information'
    },
    {
      id: 'erasure',
      title: 'Right to Erasure',
      description: 'Request deletion of your personal data',
      icon: Trash2,
      action: 'Request Deletion'
    },
    {
      id: 'portability',
      title: 'Right to Portability',
      description: 'Export your data in a machine-readable format',
      icon: Download,
      action: 'Export Data'
    }
  ]

  return (
    <UserPortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Privacy Settings</h1>
                <p className="text-gray-600 mt-1">
                  Control how your data is collected, used, and shared
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary-600" />
                <span className="text-sm font-medium text-gray-900">Privacy Score: 85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Level Presets */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Privacy Level Presets
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {privacyPresets.map((preset) => {
                const Icon = preset.icon
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePrivacyLevelChange(preset.id as any)}
                    className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                      privacyLevel === preset.id
                        ? `${preset.borderColor} ${preset.bgColor}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`h-6 w-6 ${preset.color}`} />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          {preset.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {preset.description}
                        </p>
                      </div>
                    </div>
                    {privacyLevel === preset.id && (
                      <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary-600" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Data Collection Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Data Collection & Usage
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Essential Data Collection</h4>
                    <p className="text-sm text-gray-600">Required for basic platform functionality</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.dataCollection}
                    onChange={(e) => handleSettingChange('dataCollection', e.target.checked)}
                    disabled
                  />
                  <div className="w-11 h-6 bg-primary-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics & Performance</h4>
                    <p className="text-sm text-gray-600">Help improve our services with usage data</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.analytics}
                    onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">Receive promotional content and offers</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.marketing}
                    onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Third-Party Sharing</h4>
                    <p className="text-sm text-gray-600">Share data with trusted partners</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.thirdPartySharing}
                    onChange={(e) => handleSettingChange('thirdPartySharing', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Personalization</h4>
                    <p className="text-sm text-gray-600">Customize experience based on preferences</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.personalization}
                    onChange={(e) => handleSettingChange('personalization', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Data Rights */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              Your Data Rights
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dataRights.map((right) => {
                const Icon = right.icon
                return (
                  <div key={right.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <Icon className="h-6 w-6 text-primary-600 mt-1 mr-3" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{right.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{right.description}</p>
                        <button className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-500">
                          {right.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Privacy Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Privacy Information</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Your privacy settings are automatically saved and applied</li>
                  <li>Changes may take up to 24 hours to take effect across all services</li>
                  <li>Essential data collection is required for platform functionality</li>
                  <li>You can request a copy of your data or delete your account at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPortalLayout>
  )
}