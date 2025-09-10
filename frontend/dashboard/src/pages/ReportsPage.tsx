import { DashboardLayout } from '../components/DashboardLayout'
import { Download, FileText, Calendar, Filter } from 'lucide-react'

export function ReportsPage() {
  const headerActions = (
    <div className="flex space-x-3">
      <button className="btn btn-outline">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </button>
      <button className="btn btn-primary">
        <Download className="w-4 h-4 mr-2" />
        Generate Report
      </button>
    </div>
  )

  return (
    <DashboardLayout
      title="Reports"
      subtitle="Generate and manage compliance reports"
      headerActions={headerActions}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">24</h3>
                  <p className="text-gray-600">Total Reports</p>
                </div>
                <div className="w-14 h-14 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <FileText className="w-7 h-7 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">8</h3>
                  <p className="text-gray-600">This Month</p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <Calendar className="w-7 h-7 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                  <p className="text-gray-600">Scheduled</p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <Calendar className="w-7 h-7 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card h-32">
            <div className="card-content h-full">
              <div className="flex justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">12</h3>
                  <p className="text-gray-600">Templates</p>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center self-center">
                  <FileText className="w-7 h-7 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Recent Reports</h3>
          </div>
          <div className="card-content">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Monthly Consent Report
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      PDF
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-01-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      GDPR Compliance Audit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Excel
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-01-10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      User Consent Summary
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      CSV
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-01-08
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Processing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-400 cursor-not-allowed mr-3">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Report Templates */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Report Templates</h3>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900">Monthly Consent Report</h4>
                <p className="text-sm text-gray-600 mt-1">Summary of all consent activities for the month</p>
                <div className="mt-3 flex space-x-2">
                  <button className="btn btn-sm btn-primary">Use Template</button>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900">GDPR Audit Report</h4>
                <p className="text-sm text-gray-600 mt-1">Detailed report for GDPR compliance audit</p>
                <div className="mt-3 flex space-x-2">
                  <button className="btn btn-sm btn-primary">Use Template</button>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium text-gray-900">User Consent Summary</h4>
                <p className="text-sm text-gray-600 mt-1">Overview of user consent preferences</p>
                <div className="mt-3 flex space-x-2">
                  <button className="btn btn-sm btn-primary">Use Template</button>
                  <button className="btn btn-sm btn-outline">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}