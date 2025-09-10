// Simple utility function for testing
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const dateString = '2024-01-15T10:30:00Z'
    const result = formatDate(dateString)
    expect(result).toBe('Jan 15, 2024')
  })

  it('formats a Date object correctly', () => {
    const date = new Date('2024-12-25T00:00:00Z')
    const result = formatDate(date)
    expect(result).toBe('Dec 25, 2024')
  })

  it('handles invalid date gracefully', () => {
    const invalidDate = 'invalid-date'
    const result = formatDate(invalidDate)
    expect(result).toBe('Invalid Date')
  })
})