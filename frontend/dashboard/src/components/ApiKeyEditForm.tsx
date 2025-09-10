import { useState, useEffect } from 'react'
import { AccessibleFormField } from './AccessibleFormField'
import { AccessibleButton } from './AccessibleButton'

interface ApiKeyEditFormProps {
  apiKey: {
    id: string
    name: string
    permissions: string[]
    status: string
  }
  onSubmit: (data: ApiKeyEditData) => void
  onCancel: () => void
  isLoading?: boolean
}

interface ApiKeyEditData {
  name: string
  permissions: string[]
  status: string
}

interface ApiKeyEditErrors {
  name?: string
  permissions?: string
  status?: string
}

const availablePermissions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'admin', label: 'Admin' },
  { value: 'analytics', label: 'Analytics' }
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

export function ApiKeyEditForm({ apiKey, onSubmit, onCancel, isLoading = false }: ApiKeyEditFormProps) {
  const [formData, setFormData] = useState<ApiKeyEditData>({
    name: '',
    permissions: [],
    status: 'active'
  })
  const [errors, setErrors] = useState<ApiKeyEditErrors>({})

  useEffect(() => {
    setFormData({
      name: apiKey.name,
      permissions: [...apiKey.permissions],
      status: apiKey.status
    })
  }, [apiKey])

  const validateForm = (): boolean => {
    const newErrors: ApiKeyEditErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'API key name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'API key name must be at least 3 characters'
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof ApiKeyEditData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
    
    // Clear permission error
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AccessibleFormField
        label="API Key Name"
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
        error={errors.name}
        required
        placeholder="Enter API key name"
        autoComplete="off"
      />

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {statusOptions.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Permissions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="space-y-2">
          {availablePermissions.map(permission => (
            <div key={permission.value} className="flex items-center">
              <input
                type="checkbox"
                id={`permission-${permission.value}`}
                checked={formData.permissions.includes(permission.value)}
                onChange={() => handlePermissionToggle(permission.value)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor={`permission-${permission.value}`} className="ml-2 text-sm text-gray-900">
                {permission.label}
              </label>
            </div>
          ))}
        </div>
        {errors.permissions && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.permissions}
          </p>
        )}
      </div>

      {/* Current Permissions Display */}
      {formData.permissions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Permissions
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.permissions.map(permission => (
              <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {permission}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-3 border-t">
        <AccessibleButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          size="sm"
        >
          Cancel
        </AccessibleButton>
        <AccessibleButton
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          size="sm"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </AccessibleButton>
      </div>
    </form>
  )
}