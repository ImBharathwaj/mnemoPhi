import { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  X, 
  Clock, 
  User, 
  FileText, 
  Settings, 
  BarChart3,
  TrendingUp,
  Shield,
  Database
} from 'lucide-react'

interface SearchResult {
  id: string
  type: 'user' | 'consent' | 'category' | 'report' | 'setting' | 'analytics'
  title: string
  description: string
  url: string
  icon: any
  metadata?: {
    [key: string]: any
  }
}

interface GlobalSearchProps {
  onResultClick?: (result: SearchResult) => void
  placeholder?: string
}

export function GlobalSearch({ onResultClick, placeholder = "Search..." }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Mock search data
  const mockData: SearchResult[] = [
    {
      id: '1',
      type: 'user',
      title: 'John Doe',
      description: 'john.doe@example.com • Active user with 5 consent categories',
      url: '/users/1',
      icon: User,
      metadata: { email: 'john.doe@example.com', status: 'active' }
    },
    {
      id: '2',
      type: 'user',
      title: 'Jane Smith',
      description: 'jane.smith@company.com • Manager with full permissions',
      url: '/users/2',
      icon: User,
      metadata: { email: 'jane.smith@company.com', role: 'manager' }
    },
    {
      id: '3',
      type: 'consent',
      title: 'Marketing Communications',
      description: 'Consent category for promotional emails and updates',
      url: '/consents/marketing',
      icon: Shield,
      metadata: { category: 'marketing', required: false }
    },
    {
      id: '4',
      type: 'consent',
      title: 'Analytics & Tracking',
      description: 'Consent for usage analytics and performance data',
      url: '/consents/analytics',
      icon: Shield,
      metadata: { category: 'analytics', required: false }
    },
    {
      id: '5',
      type: 'report',
      title: 'Monthly Compliance Report',
      description: 'Generated on 2024-01-01 • PDF format',
      url: '/reports/monthly-compliance',
      icon: FileText,
      metadata: { format: 'PDF', date: '2024-01-01' }
    },
    {
      id: '6',
      type: 'setting',
      title: 'Data Retention Settings',
      description: 'Configure how long to retain user data',
      url: '/settings/data-retention',
      icon: Settings,
      metadata: { category: 'privacy' }
    },
    {
      id: '7',
      type: 'analytics',
      title: 'Consent Trends',
      description: 'View consent patterns and trends over time',
      url: '/analytics/trends',
      icon: BarChart3,
      metadata: { chart: 'line' }
    },
    {
      id: '8',
      type: 'analytics',
      title: 'Geographic Distribution',
      description: 'User distribution by country and region',
      url: '/analytics/geographic',
      icon: TrendingUp,
      metadata: { chart: 'map' }
    }
  ]

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        const filteredResults = mockData.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          (item.metadata && Object.values(item.metadata).some(value =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          ))
        )
        setResults(filteredResults)
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        inputRef.current?.blur()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault()
        handleResultClick(results[selectedIndex])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [results, selectedIndex])

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result)
    }
    
    // Add to search history
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)])
    }
    
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem)
    inputRef.current?.focus()
  }

  const clearHistory = () => {
    setSearchHistory([])
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-600 bg-blue-100'
      case 'consent': return 'text-green-600 bg-green-100'
      case 'category': return 'text-purple-600 bg-purple-100'
      case 'report': return 'text-orange-600 bg-orange-100'
      case 'setting': return 'text-gray-600 bg-gray-100'
      case 'analytics': return 'text-indigo-600 bg-indigo-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'user': return 'User'
      case 'consent': return 'Consent'
      case 'category': return 'Category'
      case 'report': return 'Report'
      case 'setting': return 'Setting'
      case 'analytics': return 'Analytics'
      default: return 'Item'
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
        />
        {query && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={() => {
                setQuery('')
                setResults([])
                inputRef.current?.focus()
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {query.length === 0 ? (
            /* Search History */
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Recent Searches</h3>
                {searchHistory.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              {searchHistory.length === 0 ? (
                <div className="text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    No recent searches
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(item)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
                    >
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {item}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">/</kbd> to search
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="py-2">
              {isLoading ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-sm">Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result, index) => {
                    const Icon = result.icon
                    return (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start space-x-3 ${
                          index === selectedIndex ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          <Icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {result.title}
                            </p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {result.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Hook for managing global search
export function useGlobalSearch() {
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const addToHistory = (query: string) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)])
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
  }

  return {
    searchHistory,
    addToHistory,
    clearHistory
  }
}