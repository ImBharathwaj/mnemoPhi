import { create } from 'zustand'
import { 
  ConsentTrendData, 
  ConsentCategoryData, 
  GeographicData, 
  TimeBasedAnalytics,
  ComplianceMetrics,
  UserEngagementMetrics,
  ReportTemplate,
  ExportOptions
} from '@/types/analytics'

interface AnalyticsState {
  // Data
  consentTrends: ConsentTrendData[]
  consentCategories: ConsentCategoryData[]
  geographicData: GeographicData[]
  timeBasedAnalytics: TimeBasedAnalytics[]
  complianceMetrics: ComplianceMetrics
  userEngagement: UserEngagementMetrics
  reportTemplates: ReportTemplate[]
  
  // Loading states
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchConsentTrends: (dateRange?: { start: string; end: string }) => Promise<void>
  fetchConsentCategories: () => Promise<void>
  fetchGeographicData: () => Promise<void>
  fetchTimeBasedAnalytics: (period: string) => Promise<void>
  fetchComplianceMetrics: () => Promise<void>
  fetchUserEngagement: () => Promise<void>
  fetchReportTemplates: () => Promise<void>
  generateReport: (options: ExportOptions) => Promise<void>
  saveReportTemplate: (template: Omit<ReportTemplate, 'id'>) => Promise<void>
  clearError: () => void
}

// Mock data generators
const generateConsentTrends = (): ConsentTrendData[] => {
  const data: ConsentTrendData[] = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split('T')[0],
      consents: Math.floor(Math.random() * 200) + 50,
      withdrawals: Math.floor(Math.random() * 20) + 5,
      updates: Math.floor(Math.random() * 100) + 20
    })
  }
  return data
}

const generateConsentCategories = (): ConsentCategoryData[] => [
  { category: 'Marketing', totalConsents: 2450, activeConsents: 2300, withdrawalRate: 6.1, complianceRate: 94.2 },
  { category: 'Analytics', totalConsents: 2100, activeConsents: 1980, withdrawalRate: 5.7, complianceRate: 95.1 },
  { category: 'Personalization', totalConsents: 1800, activeConsents: 1650, withdrawalRate: 8.3, complianceRate: 91.7 },
  { category: 'Communication', totalConsents: 2200, activeConsents: 2100, withdrawalRate: 4.5, complianceRate: 96.8 },
  { category: 'Third-party', totalConsents: 1500, activeConsents: 1350, withdrawalRate: 10.0, complianceRate: 90.0 },
  { category: 'Location', totalConsents: 1200, activeConsents: 1100, withdrawalRate: 8.3, complianceRate: 91.7 },
  { category: 'Biometric', totalConsents: 800, activeConsents: 720, withdrawalRate: 10.0, complianceRate: 90.0 },
  { category: 'Health', totalConsents: 600, activeConsents: 550, withdrawalRate: 8.3, complianceRate: 91.7 }
]

const generateGeographicData = (): GeographicData[] => [
  { country: 'United States', region: 'North America', totalUsers: 1200, consentRate: 92.5, complianceScore: 94.2 },
  { country: 'Germany', region: 'Europe', totalUsers: 850, consentRate: 95.8, complianceScore: 96.1 },
  { country: 'United Kingdom', region: 'Europe', totalUsers: 720, consentRate: 94.3, complianceScore: 95.5 },
  { country: 'France', region: 'Europe', totalUsers: 680, consentRate: 93.7, complianceScore: 94.8 },
  { country: 'Canada', region: 'North America', totalUsers: 450, consentRate: 91.2, complianceScore: 93.1 },
  { country: 'Australia', region: 'Oceania', totalUsers: 380, consentRate: 89.5, complianceScore: 91.8 },
  { country: 'Japan', region: 'Asia', totalUsers: 320, consentRate: 88.1, complianceScore: 90.5 },
  { country: 'Brazil', region: 'South America', totalUsers: 280, consentRate: 87.3, complianceScore: 89.2 }
]

const generateTimeBasedAnalytics = (): TimeBasedAnalytics[] => [
  { period: 'Last 7 days', totalConsents: 1250, activeConsents: 1180, withdrawnConsents: 70, newUsers: 180, complianceRate: 94.4 },
  { period: 'Last 30 days', totalConsents: 5200, activeConsents: 4850, withdrawnConsents: 350, newUsers: 720, complianceRate: 93.3 },
  { period: 'Last 90 days', totalConsents: 15200, activeConsents: 14100, withdrawnConsents: 1100, newUsers: 2100, complianceRate: 92.8 },
  { period: 'Last year', totalConsents: 58400, activeConsents: 53800, withdrawnConsents: 4600, newUsers: 8500, complianceRate: 92.1 }
]

const generateComplianceMetrics = (): ComplianceMetrics => ({
  overallCompliance: 94.2,
  gdprCompliance: 95.8,
  ccpaCompliance: 92.1,
  lgpdCompliance: 94.7,
  lastUpdated: new Date().toISOString()
})

const generateUserEngagement = (): UserEngagementMetrics => ({
  totalUsers: 2847,
  activeUsers: 2650,
  newUsersThisMonth: 180,
  averageConsentRate: 93.2,
  topConsentCategories: ['Marketing', 'Analytics', 'Communication', 'Personalization', 'Third-party']
})

const generateReportTemplates = (): ReportTemplate[] => [
  {
    id: '1',
    name: 'Monthly Consent Report',
    description: 'Comprehensive monthly overview of all consent activities',
    type: 'consent',
    parameters: ['dateRange', 'categories', 'complianceStatus'],
    lastGenerated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'GDPR Compliance Report',
    description: 'Detailed GDPR compliance metrics and violations',
    type: 'compliance',
    parameters: ['dateRange', 'countries', 'violationTypes'],
    lastGenerated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'User Engagement Report',
    description: 'User activity and engagement metrics',
    type: 'user',
    parameters: ['dateRange', 'userSegments', 'activityTypes'],
    lastGenerated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Geographic Distribution',
    description: 'User and consent distribution by geography',
    type: 'geographic',
    parameters: ['dateRange', 'regions', 'complianceThresholds']
  }
]

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial state
  consentTrends: [],
  consentCategories: [],
  geographicData: [],
  timeBasedAnalytics: [],
  complianceMetrics: {
    overallCompliance: 0,
    gdprCompliance: 0,
    ccpaCompliance: 0,
    lgpdCompliance: 0,
    lastUpdated: new Date().toISOString()
  },
  userEngagement: {
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    averageConsentRate: 0,
    topConsentCategories: []
  },
  reportTemplates: [],
  isLoading: false,
  error: null,

  // Actions
  fetchConsentTrends: async (_dateRange) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const data = generateConsentTrends()
      set({ consentTrends: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch consent trends', isLoading: false })
    }
  },

  fetchConsentCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const data = generateConsentCategories()
      set({ consentCategories: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch consent categories', isLoading: false })
    }
  },

  fetchGeographicData: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 900))
      const data = generateGeographicData()
      set({ geographicData: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch geographic data', isLoading: false })
    }
  },

  fetchTimeBasedAnalytics: async (_period) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 700))
      const data = generateTimeBasedAnalytics()
      set({ timeBasedAnalytics: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch time-based analytics', isLoading: false })
    }
  },

  fetchComplianceMetrics: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      const data = generateComplianceMetrics()
      set({ complianceMetrics: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch compliance metrics', isLoading: false })
    }
  },

  fetchUserEngagement: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const data = generateUserEngagement()
      set({ userEngagement: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch user engagement', isLoading: false })
    }
  },

  fetchReportTemplates: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      const data = generateReportTemplates()
      set({ reportTemplates: data, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch report templates', isLoading: false })
    }
  },

  generateReport: async (options) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Generating report with options:', options)
      set({ isLoading: false })
    } catch (error) {
      set({ error: 'Failed to generate report', isLoading: false })
    }
  },

  saveReportTemplate: async (template) => {
    set({ isLoading: true, error: null })
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const newTemplate: ReportTemplate = {
        ...template,
        id: Date.now().toString()
      }
      const { reportTemplates } = get()
      set({ 
        reportTemplates: [...reportTemplates, newTemplate], 
        isLoading: false 
      })
    } catch (error) {
      set({ error: 'Failed to save template', isLoading: false })
    }
  },

  clearError: () => set({ error: null })
}))