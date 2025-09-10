import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { ComplianceMetrics } from '@/types/analytics'
import { Shield, Clock } from 'lucide-react'

interface ComplianceMetricsProps {
  data: ComplianceMetrics
  title?: string
}

export function ComplianceMetricsComponent({ data, title = "Compliance Overview" }: ComplianceMetricsProps) {
  const complianceData = [
    { name: 'GDPR', value: data.gdprCompliance, color: '#10b981' },
    { name: 'CCPA', value: data.ccpaCompliance, color: '#3b82f6' },
    { name: 'LGPD', value: data.lgpdCompliance, color: '#8b5cf6' },
    { name: 'Other', value: 100 - data.gdprCompliance - data.ccpaCompliance - data.lgpdCompliance, color: '#6b7280' }
  ]

  const getComplianceStatus = (score: number) => {
    if (score >= 95) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (score >= 85) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (score >= 70) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    return { status: 'Needs Attention', color: 'text-red-600', bgColor: 'bg-red-100' }
  }

  const overallStatus = getComplianceStatus(data.overallCompliance)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {/* Overall Compliance Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Overall Compliance</span>
          <span className={`text-sm font-medium ${overallStatus.color}`}>
            {overallStatus.status}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              data.overallCompliance >= 95 ? 'bg-green-500' :
              data.overallCompliance >= 85 ? 'bg-blue-500' :
              data.overallCompliance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${data.overallCompliance}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span className="font-medium">{data.overallCompliance}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Compliance Breakdown Chart */}
      <div className="mb-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={complianceData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {complianceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value}%`, 'Compliance']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Compliance Scores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">GDPR</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{data.gdprCompliance}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">CCPA</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{data.ccpaCompliance}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-4 h-4 text-purple-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">LGPD</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{data.lgpdCompliance}%</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-gray-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Updated</span>
          </div>
          <div className="text-xs text-gray-500">{new Date(data.lastUpdated).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}