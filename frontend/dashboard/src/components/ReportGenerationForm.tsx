import { useState } from 'react'
import { AccessibleFormField } from './AccessibleFormField'
import { AccessibleButton } from './AccessibleButton'

interface ReportGenerationFormProps {
  onSubmit: (data: ReportData) => void
  onCancel: () => void
  isLoading?: boolean
}

interface ReportData {
  reportType: string
  dateRange: {
    start: string
    end: string
  }
  format: string
  includeCharts: boolean
  includeDetails: boolean
  emailNotification: boolean
  emailAddress: string
  description: string
}

interface ReportErrors {
  reportType?: string
  dateRange?: {
    start?: string
    end?: string
  }
  format?: string
  includeCharts?: string
  includeDetails?: string
  emailNotification?: string
  emailAddress?: string
  description?: string
}

const reportTypes = [
  { value: 'consent-summary', label: 'Consent Summary Report' },
  { value: 'gdpr-compliance', label: 'GDPR Compliance Report' },
  { value: 'user-activity', label: 'User Activity Report' },
  { value: 'data-processing', label: 'Data Processing Report' },
  { value: 'consent-trends', label: 'Consent Trends Report' },
  { value: 'custom', label: 'Custom Report' }
]

const formats = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel (.xlsx)' },
  { value: 'csv', label: 'CSV' }
]

export function ReportGenerationForm({ onSubmit, onCancel, isLoading = false }: ReportGenerationFormProps) {
  const [formData, setFormData] = useState<ReportData>({
    reportType: 'consent-summary',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      end: new Date().toISOString().split('T')[0] // today
    },
    format: 'pdf',
    includeCharts: true,
    includeDetails: true,
    emailNotification: false,
    emailAddress: '',
    description: ''
  })
  const [errors, setErrors] = useState<ReportErrors>({})

  const validateForm = (): boolean => {
    const newErrors: ReportErrors = {}

    if (!formData.dateRange.start) {
      newErrors.dateRange = { ...newErrors.dateRange, start: 'Start date is required' }
    }
    if (!formData.dateRange.end) {
      newErrors.dateRange = { ...newErrors.dateRange, end: 'End date is required' }
    }
    if (formData.dateRange.start && formData.dateRange.end && 
        new Date(formData.dateRange.start) > new Date(formData.dateRange.end)) {
      newErrors.dateRange = { ...newErrors.dateRange, end: 'End date must be after start date' }
    }

    if (formData.emailNotification && !formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required when email notification is enabled'
    } else if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address'
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

  const handleInputChange = (field: keyof ReportData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }))
    
    // Clear date range errors
    if (errors.dateRange) {
      setErrors(prev => ({ ...prev, dateRange: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Report Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Report Type
        </label>
        <select
          value={formData.reportType}
          onChange={(e) => handleInputChange('reportType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {reportTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
            <input
              type="date"
              value={formData.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.dateRange?.start ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dateRange?.start && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.dateRange.start}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">End Date</label>
            <input
              type="date"
              value={formData.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.dateRange?.end ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dateRange?.end && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.dateRange.end}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Output Format
        </label>
        <select
          value={formData.format}
          onChange={(e) => handleInputChange('format', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {formats.map(format => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeCharts"
            checked={formData.includeCharts}
            onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="includeCharts" className="ml-2 text-sm text-gray-900">
            Include charts and graphs
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeDetails"
            checked={formData.includeDetails}
            onChange={(e) => handleInputChange('includeDetails', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="includeDetails" className="ml-2 text-sm text-gray-900">
            Include detailed data
          </label>
        </div>
      </div>

      {/* Email Notification */}
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="emailNotification"
            checked={formData.emailNotification}
            onChange={(e) => handleInputChange('emailNotification', e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="emailNotification" className="ml-2 text-sm text-gray-900">
            Email notification when ready
          </label>
        </div>
        {formData.emailNotification && (
          <AccessibleFormField
            label="Email Address"
            value={formData.emailAddress}
            onChange={(value) => handleInputChange('emailAddress', value)}
            error={errors.emailAddress}
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
          />
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Add a description for this report..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows={2}
        />
      </div>

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
          {isLoading ? 'Generating...' : 'Generate Report'}
        </AccessibleButton>
      </div>
    </form>
  )
}