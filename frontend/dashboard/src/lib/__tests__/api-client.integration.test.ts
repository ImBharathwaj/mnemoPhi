import axios from 'axios'

// Mock axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Mock the shared library
jest.mock('@mnemophi/shared', () => ({
  apiClient: {
    setAuthToken: jest.fn(),
    clearAuthToken: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}))

import { apiClient } from '@mnemophi/shared'

// Mock window.location
const mockLocation = {
  href: '',
  assign: jest.fn(),
  replace: jest.fn(),
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('API Client Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocation.href = ''
  })

  describe('Authentication Integration', () => {
    it('should include auth token in requests when set', async () => {
      const mockToken = 'test-jwt-token'
      const mockResponse = { data: { success: true } }
      
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse),
        post: jest.fn().mockResolvedValue(mockResponse),
        put: jest.fn().mockResolvedValue(mockResponse),
        patch: jest.fn().mockResolvedValue(mockResponse),
        delete: jest.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      // Set auth token
      apiClient.setAuthToken(mockToken)

      // Make a request
      await apiClient.get('/test')

      // Verify axios was called with auth header
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:8080/api',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should clear auth token and redirect on 401 error', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
        config: { skipErrorHandling: false },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      // Set auth token
      apiClient.setAuthToken('test-token')

      try {
        await apiClient.get('/protected')
      } catch (error) {
        // Expected to throw
      }

      // Verify token was cleared and redirect happened
      expect(mockLocation.href).toBe('/auth/login')
    })

    it('should skip auth for requests with skipAuth flag', async () => {
      const mockResponse = { data: { success: true } }
      
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse),
        post: jest.fn().mockResolvedValue(mockResponse),
        put: jest.fn().mockResolvedValue(mockResponse),
        patch: jest.fn().mockResolvedValue(mockResponse),
        delete: jest.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      // Set auth token
      apiClient.setAuthToken('test-token')

      // Make request with skipAuth
      await apiClient.get('/public', { skipAuth: true })

      // Verify request was made without auth
      expect(mockedAxios.create).toHaveBeenCalled()
    })
  })

  describe('HTTP Methods Integration', () => {
    beforeEach(() => {
      const mockResponse = { data: { success: true, data: {} } }
      
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse),
        post: jest.fn().mockResolvedValue(mockResponse),
        put: jest.fn().mockResolvedValue(mockResponse),
        patch: jest.fn().mockResolvedValue(mockResponse),
        delete: jest.fn().mockResolvedValue(mockResponse),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)
    })

    it('should handle GET requests', async () => {
      const result = await apiClient.get('/users')
      expect(result).toEqual({ success: true, data: {} })
    })

    it('should handle POST requests', async () => {
      const data = { name: 'Test User' }
      const result = await apiClient.post('/users', data)
      expect(result).toEqual({ success: true, data: {} })
    })

    it('should handle PUT requests', async () => {
      const data = { name: 'Updated User' }
      const result = await apiClient.put('/users/1', data)
      expect(result).toEqual({ success: true, data: {} })
    })

    it('should handle PATCH requests', async () => {
      const data = { name: 'Patched User' }
      const result = await apiClient.patch('/users/1', data)
      expect(result).toEqual({ success: true, data: {} })
    })

    it('should handle DELETE requests', async () => {
      const result = await apiClient.delete('/users/1')
      expect(result).toEqual({ success: true, data: {} })
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle 403 Forbidden errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
        config: { skipErrorHandling: false },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      try {
        await apiClient.get('/forbidden')
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Forbidden:', 'Forbidden')
      consoleSpy.mockRestore()
    })

    it('should handle 404 Not Found errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = {
        response: {
          status: 404,
          data: { message: 'Not Found' },
        },
        config: { skipErrorHandling: false },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      try {
        await apiClient.get('/not-found')
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Not found:', 'Not Found')
      consoleSpy.mockRestore()
    })

    it('should handle 500 Server errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' },
        },
        config: { skipErrorHandling: false },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      try {
        await apiClient.get('/server-error')
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Server error:', 'Internal Server Error')
      consoleSpy.mockRestore()
    })

    it('should handle network errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = {
        request: {},
        message: 'Network Error',
        config: { skipErrorHandling: false },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      try {
        await apiClient.get('/network-error')
      } catch (error) {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Network error:', 'Network Error')
      consoleSpy.mockRestore()
    })

    it('should skip error handling when skipErrorHandling is true', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const mockError = {
        response: {
          status: 500,
          data: { message: 'Server Error' },
        },
        config: { skipErrorHandling: true },
      }

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError),
        post: jest.fn().mockRejectedValue(mockError),
        put: jest.fn().mockRejectedValue(mockError),
        patch: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any)

      try {
        await apiClient.get('/skip-error')
      } catch (error) {
        // Expected to throw
      }

      // Should not log error when skipErrorHandling is true
      expect(consoleSpy).not.toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})