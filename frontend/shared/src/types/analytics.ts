export interface ConsentTrendData {
  date: string
  consents: number
  withdrawals: number
  updates: number
}

export interface ConsentCategoryData {
  category: string
  totalConsents: number
  activeConsents: number
  withdrawalRate: number
  complianceRate: number
}

export interface GeographicData {
  country: string
  region: string
  totalUsers: number
  consentRate: number
  complianceScore: number
}

export interface TimeBasedAnalytics {
  period: string
  totalConsents: number
  activeConsents: number
  withdrawnConsents: number
  newUsers: number
  complianceRate: number
}

export interface ComplianceMetrics {
  overallCompliance: number
  gdprCompliance: number
  ccpaCompliance: number
  lgpdCompliance: number
  lastUpdated: string
}

export interface UserEngagementMetrics {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  averageConsentRate: number
  topConsentCategories: string[]
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  type: 'consent' | 'compliance' | 'user' | 'geographic'
  parameters: string[]
  lastGenerated?: string
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf' | 'excel'
  dateRange: {
    start: string
    end: string
  }
  filters: {
    categories?: string[]
    countries?: string[]
    complianceStatus?: string[]
  }
  includeCharts: boolean
}