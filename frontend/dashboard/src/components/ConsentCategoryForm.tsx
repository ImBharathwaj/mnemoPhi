import { useState } from 'react'
import { AccessibleFormField } from './AccessibleFormField'
import { AccessibleButton } from './AccessibleButton'

interface ConsentCategoryFormProps {
  onSubmit: (data: ConsentCategoryData) => void
  onCancel: () => void
  isLoading?: boolean
}

interface ConsentCategoryData {
  name: string
  description: string
  isRequired: boolean
  isActive: boolean
}

export function ConsentCategoryForm({ onSubmit, onCancel, isLoading = false }: ConsentCategoryFormProps) {
  const [formData, setFormData] = useState<ConsentCategoryData>({
    name: '',
    description: '',
    isRequired: false,
    isActive: true,
  })
  const [errors, setErrors] = useState<Partial<ConsentCategoryData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ConsentCategoryData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Category name must be at least 3 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
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

  const handleInputChange = (field: keyof ConsentCategoryData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <AccessibleFormField
        label="Name"
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
        error={errors.name}
        required
        placeholder="Category name"
        autoComplete="off"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Brief description..."
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={2}
          required
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isRequired"
            checked={formData.isRequired}
            onChange={(e) => handleInputChange('isRequired', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isRequired" className="ml-2 text-sm text-gray-900">
            Required category
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => handleInputChange('isActive', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-gray-900">
            Active category
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2 border-t">
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
          {isLoading ? 'Creating...' : 'Create'}
        </AccessibleButton>
      </div>
    </form>
  )
}