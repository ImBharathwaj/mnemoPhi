import { useState } from 'react'
import { useAuthStore } from '@mnemophi/shared'
import { toast } from 'react-hot-toast'

export function ComponentsPage() {
  const { user } = useAuthStore()
  const [inputValue, setInputValue] = useState('')

  const handleShowNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    ;(toast as any)[type](`This is a ${type} notification!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Component Showcase</h1>
              <p className="text-gray-600">Testing all MnemoPhi components</p>
            </div>
            <a href="/dashboard" className="btn btn-outline">
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          
          {/* Authentication Status */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Authentication Status</h3>
            </div>
            <div className="card-content">
              <p>Status: Authenticated</p>
              <p>User: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Buttons</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex gap-4 flex-wrap">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-ghost">Ghost</button>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Inputs</h3>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Notifications</h3>
            </div>
            <div className="card-content">
              <div className="flex gap-4 flex-wrap">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleShowNotification('success')}
                >
                  Success
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleShowNotification('error')}
                >
                  Error
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleShowNotification('warning')}
                >
                  Warning
                </button>
                <button 
                  className="btn btn-ghost"
                  onClick={() => handleShowNotification('info')}
                >
                  Info
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Card Components</h3>
              <p className="card-description">Different card layouts and styles</p>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card">
                  <div className="card-content">
                    <h4 className="font-semibold">Simple Card</h4>
                    <p className="text-sm text-gray-600">This is a simple card component.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Card with Header</h4>
                  </div>
                  <div className="card-content">
                    <p className="text-sm text-gray-600">This card has a header section.</p>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-content">
                    <h4 className="font-semibold">Card with Footer</h4>
                    <p className="text-sm text-gray-600">This card has a footer section.</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary text-sm">Action</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}