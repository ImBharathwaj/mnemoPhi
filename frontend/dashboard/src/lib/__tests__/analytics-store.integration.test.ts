import { act, renderHook } from '@testing-library/react'

// Mock the shared library
jest.mock('@mnemophi/shared', () => ({
  useAnalyticsStore: jest.fn(),
}))

import { useAnalyticsStore } from '@mnemophi/shared'

describe('Analytics Store Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset store state
    useAnalyticsStore.setState({
      consentTrends: [],
      consentCategories: [],
      geographicData: [],
      timeBasedAnalytics: [],
      complianceMetrics: {
        gdpr: 0,
        ccpa: 0,
        lgpd: 0,
        overall: 0,
      },
      userEngagement: {
        totalUsers: 0,
        activeUsers: 0,
        engagementRate: 0,
        averageSessionTime: 0,
      },
      reportTemplates: [],
      isLoading: false,
      error: null,
    })
  })

  describe('Data Fetching Integration', () => {
    it('should handle successful consent trends fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchConsentTrends()
      })

      expect(result.current.consentTrends).toHaveLength(30)
      expect(result.current.consentTrends[0]).toHaveProperty('date')
      expect(result.current.consentTrends[0]).toHaveProperty('consents')
      expect(result.current.consentTrends[0]).toHaveProperty('withdrawals')
      expect(result.current.consentTrends[0]).toHaveProperty('updates')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle consent trends fetching with custom date range', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      const dateRange = {
        start: '2024-01-01',
        end: '2024-01-07',
      }

      await act(async () => {
        await result.current.fetchConsentTrends(dateRange)
      })

      expect(result.current.consentTrends).toHaveLength(7)
      expect(result.current.consentTrends[0].date).toBe('2024-01-01')
      expect(result.current.consentTrends[6].date).toBe('2024-01-07')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful consent categories fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchConsentCategories()
      })

      expect(result.current.consentCategories).toHaveLength(8)
      expect(result.current.consentCategories[0]).toHaveProperty('id')
      expect(result.current.consentCategories[0]).toHaveProperty('name')
      expect(result.current.consentCategories[0]).toHaveProperty('count')
      expect(result.current.consentCategories[0]).toHaveProperty('percentage')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful geographic data fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchGeographicData()
      })

      expect(result.current.geographicData).toHaveLength(10)
      expect(result.current.geographicData[0]).toHaveProperty('country')
      expect(result.current.geographicData[0]).toHaveProperty('users')
      expect(result.current.geographicData[0]).toHaveProperty('compliance')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful time-based analytics fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchTimeBasedAnalytics('7d')
      })

      expect(result.current.timeBasedAnalytics).toHaveLength(7)
      expect(result.current.timeBasedAnalytics[0]).toHaveProperty('date')
      expect(result.current.timeBasedAnalytics[0]).toHaveProperty('consents')
      expect(result.current.timeBasedAnalytics[0]).toHaveProperty('withdrawals')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful compliance metrics fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchComplianceMetrics()
      })

      expect(result.current.complianceMetrics).toHaveProperty('gdpr')
      expect(result.current.complianceMetrics).toHaveProperty('ccpa')
      expect(result.current.complianceMetrics).toHaveProperty('lgpd')
      expect(result.current.complianceMetrics).toHaveProperty('overall')
      expect(result.current.complianceMetrics.gdpr).toBeGreaterThan(0)
      expect(result.current.complianceMetrics.ccpa).toBeGreaterThan(0)
      expect(result.current.complianceMetrics.lgpd).toBeGreaterThan(0)
      expect(result.current.complianceMetrics.overall).toBeGreaterThan(0)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful user engagement fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchUserEngagement()
      })

      expect(result.current.userEngagement).toHaveProperty('totalUsers')
      expect(result.current.userEngagement).toHaveProperty('activeUsers')
      expect(result.current.userEngagement).toHaveProperty('engagementRate')
      expect(result.current.userEngagement).toHaveProperty('averageSessionTime')
      expect(result.current.userEngagement.totalUsers).toBeGreaterThan(0)
      expect(result.current.userEngagement.activeUsers).toBeGreaterThan(0)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle successful report templates fetching', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      await act(async () => {
        await result.current.fetchReportTemplates()
      })

      expect(result.current.reportTemplates).toHaveLength(3)
      expect(result.current.reportTemplates[0]).toHaveProperty('id')
      expect(result.current.reportTemplates[0]).toHaveProperty('name')
      expect(result.current.reportTemplates[0]).toHaveProperty('description')
      expect(result.current.reportTemplates[0]).toHaveProperty('filters')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Report Generation Integration', () => {
    it('should handle successful report generation', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      const exportOptions = {
        format: 'pdf' as const,
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31',
        },
        includeCharts: true,
        includeData: true,
      }

      await act(async () => {
        await result.current.generateReport(exportOptions)
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle report generation with different formats', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      const formats = ['pdf', 'excel', 'json', 'csv'] as const

      for (const format of formats) {
        const exportOptions = {
          format,
          dateRange: {
            start: '2024-01-01',
            end: '2024-01-31',
          },
          includeCharts: true,
          includeData: true,
        }

        await act(async () => {
          await result.current.generateReport(exportOptions)
        })

        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBe(null)
      }
    })

    it('should handle successful report template saving', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      const template = {
        name: 'Custom Template',
        description: 'A custom report template',
        filters: {
          dateRange: {
            start: '2024-01-01',
            end: '2024-01-31',
          },
          categories: ['marketing', 'analytics'],
          includeCharts: true,
        },
      }

      await act(async () => {
        await result.current.saveReportTemplate(template)
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle fetch errors gracefully', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Mock a fetch error
      const originalFetchConsentTrends = result.current.fetchConsentTrends
      result.current.fetchConsentTrends = jest.fn().mockRejectedValue(new Error('Fetch failed'))

      await act(async () => {
        try {
          await result.current.fetchConsentTrends()
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Fetch failed')

      // Restore original function
      result.current.fetchConsentTrends = originalFetchConsentTrends
    })

    it('should handle report generation errors', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Mock a report generation error
      const originalGenerateReport = result.current.generateReport
      result.current.generateReport = jest.fn().mockRejectedValue(new Error('Report generation failed'))

      const exportOptions = {
        format: 'pdf' as const,
        dateRange: {
          start: '2024-01-01',
          end: '2024-01-31',
        },
        includeCharts: true,
        includeData: true,
      }

      await act(async () => {
        try {
          await result.current.generateReport(exportOptions)
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Report generation failed')

      // Restore original function
      result.current.generateReport = originalGenerateReport
    })

    it('should handle template saving errors', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Mock a template saving error
      const originalSaveReportTemplate = result.current.saveReportTemplate
      result.current.saveReportTemplate = jest.fn().mockRejectedValue(new Error('Template save failed'))

      const template = {
        name: 'Test Template',
        description: 'A test template',
        filters: {
          dateRange: {
            start: '2024-01-01',
            end: '2024-01-31',
          },
          categories: ['marketing'],
          includeCharts: true,
        },
      }

      await act(async () => {
        try {
          await result.current.saveReportTemplate(template)
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Template save failed')

      // Restore original function
      result.current.saveReportTemplate = originalSaveReportTemplate
    })
  })

  describe('State Management Integration', () => {
    it('should handle clearError action', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Set an error first
      act(() => {
        result.current.setError('Test error')
      })

      expect(result.current.error).toBe('Test error')

      // Clear the error
      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBe(null)
    })

    it('should handle loading state during operations', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Start fetching
      act(() => {
        result.current.fetchConsentTrends()
      })

      // Check loading state
      expect(result.current.isLoading).toBe(true)

      // Wait for completion
      await act(async () => {
        await result.current.fetchConsentTrends()
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('should handle multiple concurrent operations', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Start multiple operations
      const promises = [
        result.current.fetchConsentTrends(),
        result.current.fetchConsentCategories(),
        result.current.fetchGeographicData(),
      ]

      await act(async () => {
        await Promise.all(promises)
      })

      expect(result.current.consentTrends).toHaveLength(30)
      expect(result.current.consentCategories).toHaveLength(8)
      expect(result.current.geographicData).toHaveLength(10)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Data Consistency Integration', () => {
    it('should maintain data consistency across multiple fetches', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      // Fetch data multiple times
      await act(async () => {
        await result.current.fetchConsentTrends()
      })

      const firstFetch = result.current.consentTrends

      await act(async () => {
        await result.current.fetchConsentTrends()
      })

      const secondFetch = result.current.consentTrends

      // Data should be consistent (same structure, different values due to random generation)
      expect(firstFetch).toHaveLength(secondFetch.length)
      expect(firstFetch[0]).toHaveProperty('date')
      expect(secondFetch[0]).toHaveProperty('date')
    })

    it('should handle date range consistency', async () => {
      const { result } = renderHook(() => useAnalyticsStore())

      const dateRange = {
        start: '2024-01-01',
        end: '2024-01-05',
      }

      await act(async () => {
        await result.current.fetchConsentTrends(dateRange)
      })

      const trends = result.current.consentTrends
      expect(trends).toHaveLength(5)
      expect(trends[0].date).toBe('2024-01-01')
      expect(trends[4].date).toBe('2024-01-05')

      // Verify all dates are in sequence
      for (let i = 1; i < trends.length; i++) {
        const prevDate = new Date(trends[i - 1].date)
        const currDate = new Date(trends[i].date)
        expect(currDate.getTime() - prevDate.getTime()).toBe(24 * 60 * 60 * 1000) // 1 day
      }
    })
  })
})