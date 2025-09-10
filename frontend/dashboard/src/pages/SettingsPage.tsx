import { DashboardLayout } from '../components/DashboardLayout'
import { Save, User, Shield, Bell, Database, Globe } from 'lucide-react'

export function SettingsPage() {
  const headerActions = (
    <button className="btn btn-primary">
      <Save className="w-4 h-4 mr-2" />
      Save Changes
    </button>
  )

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account and application preferences"
      headerActions={headerActions}
    >
      <div className="space-y-6">
        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary-600" />
                <h3 className="text-lg font-semibold">Account Settings</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input mt-1 block w-full"
                  defaultValue="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input mt-1 block w-full"
                  defaultValue="Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input mt-1 block w-full"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="input mt-1 block w-full"
                  defaultValue="MnemoPhi Inc."
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary-600" />
                <h3 className="text-lg font-semibold">Security Settings</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="input mt-1 block w-full"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="input mt-1 block w-full"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="input mt-1 block w-full"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactor"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-900">
                  Enable Two-Factor Authentication
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary-600" />
                <h3 className="text-lg font-semibold">Notification Settings</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Consent Updates</h4>
                  <p className="text-sm text-gray-500">Notify when user consents change</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Compliance Alerts</h4>
                  <p className="text-sm text-gray-500">Alert for compliance issues</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Report Ready</h4>
                  <p className="text-sm text-gray-500">Notify when reports are generated</p>
                </div>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-primary-600" />
                <h3 className="text-lg font-semibold">Data Settings</h3>
              </div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label htmlFor="dataRetention" className="block text-sm font-medium text-gray-700">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  id="dataRetention"
                  className="input mt-1 block w-full"
                  defaultValue="365"
                />
              </div>
              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700">
                  Backup Frequency
                </label>
                <select id="backupFrequency" className="input mt-1 block w-full">
                  <option value="daily">Daily</option>
                  <option value="weekly" selected>Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoBackup"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="autoBackup" className="ml-2 block text-sm text-gray-900">
                  Enable Automatic Backups
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="dataEncryption"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="dataEncryption" className="ml-2 block text-sm text-gray-900">
                  Encrypt Stored Data
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary-600" />
              <h3 className="text-lg font-semibold">Regional Settings</h3>
            </div>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select id="timezone" className="input mt-1 block w-full">
                  <option value="UTC">UTC</option>
                  <option value="EST" selected>Eastern Time (EST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                  <option value="GMT">Greenwich Mean Time (GMT)</option>
                  <option value="CET">Central European Time (CET)</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                  Date Format
                </label>
                <select id="dateFormat" className="input mt-1 block w-full">
                  <option value="MM/DD/YYYY" selected>MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select id="currency" className="input mt-1 block w-full">
                  <option value="USD" selected>USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select id="language" className="input mt-1 block w-full">
                  <option value="en" selected>English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}