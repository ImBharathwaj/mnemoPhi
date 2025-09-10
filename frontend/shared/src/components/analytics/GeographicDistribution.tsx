import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GeographicData } from '@/types/analytics'
import { Globe, Users, TrendingUp } from 'lucide-react'

interface GeographicDistributionProps {
  data: GeographicData[]
  title?: string
  height?: number
}

export function GeographicDistribution({ data, title = "Geographic Distribution", height = 300 }: GeographicDistributionProps) {
  const topCountries = data.slice(0, 8) // Show top 8 countries

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Globe className="w-5 h-5 text-gray-400" />
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={topCountries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="country" 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => {
              if (name === 'totalUsers') return [value.toLocaleString(), 'Total Users']
              if (name === 'consentRate') return [`${value}%`, 'Consent Rate']
              if (name === 'complianceScore') return [`${value}%`, 'Compliance Score']
              return [value, name]
            }}
          />
          <Bar 
            dataKey="totalUsers" 
            fill="#3b82f6" 
            name="Total Users"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Total Countries</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{data.length}</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Avg Consent Rate</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {Math.round(data.reduce((acc, item) => acc + item.consentRate, 0) / data.length)}%
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Globe className="w-4 h-4 text-purple-600 mr-1" />
            <span className="text-sm font-medium text-gray-600">Top Region</span>
          </div>
          <div className="text-sm font-bold text-purple-600">
            {data.reduce((prev, current) => (prev.totalUsers > current.totalUsers) ? prev : current).region}
          </div>
        </div>
      </div>
    </div>
  )
}