import { useState } from 'react'
import { ReportTemplate, ExportOptions } from '@/types/analytics'
import { Download, Calendar, FileText, Plus } from 'lucide-react'

interface ReportBuilderProps {
  templates: ReportTemplate[]
  onGenerateReport: (options: ExportOptions) => void
  onSaveTemplate: (template: Omit<ReportTemplate, 'id'>) => void
}

export function ReportBuilder({ templates, onGenerateReport, onSaveTemplate }: ReportBuilderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    filters: {
      categories: [],
      countries: [],
      complianceStatus: []
    },
    includeCharts: true
  })
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    type: 'consent' as const,
    parameters: [] as string[]
  })

  const handleGenerateReport = () => {
    onGenerateReport(exportOptions)
  }

  const handleSaveTemplate = () => {
    onSaveTemplate(newTemplate)
    setNewTemplate({ name: '', description: '', type: 'consent', parameters: [] })
    setShowTemplateForm(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Report Builder</h3>
        <button
          onClick={() => setShowTemplateForm(!showTemplateForm)}
          className="flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </button>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Select Template
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedTemplate?.id === template.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 capitalize">{template.type}</span>
                {template.lastGenerated && (
                  <span className="text-xs text-gray-500">
                    Last: {new Date(template.lastGenerated).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Download className="w-4 h-4 inline mr-2" />
            Export Format
          </label>
          <select
            value={exportOptions.format}
            onChange={(e) => setExportOptions({ ...exportOptions, format: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={exportOptions.dateRange.start}
              onChange={(e) => setExportOptions({
                ...exportOptions,
                dateRange: { ...exportOptions.dateRange, start: e.target.value }
              })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              value={exportOptions.dateRange.end}
              onChange={(e) => setExportOptions({
                ...exportOptions,
                dateRange: { ...exportOptions.dateRange, end: e.target.value }
              })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={exportOptions.includeCharts}
              onChange={(e) => setExportOptions({ ...exportOptions, includeCharts: e.target.checked })}
              className="mr-2"
            />
            Include Charts and Visualizations
          </label>
        </div>

        <button
          onClick={handleGenerateReport}
          className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* New Template Form */}
      {showTemplateForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Create New Template</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Template Name"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              placeholder="Description"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={2}
            />
            <select
              value={newTemplate.type}
              onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="consent">Consent Report</option>
              <option value="compliance">Compliance Report</option>
              <option value="user">User Report</option>
              <option value="geographic">Geographic Report</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleSaveTemplate}
                className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Save Template
              </button>
              <button
                onClick={() => setShowTemplateForm(false)}
                className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}