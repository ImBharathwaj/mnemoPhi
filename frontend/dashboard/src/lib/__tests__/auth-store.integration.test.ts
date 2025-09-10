import { act, renderHook } from '@testing-library/react'

// Mock the shared library
jest.mock('@mnemophi/shared', () => ({
  useAuthStore: jest.fn(),
}))

import { useAuthStore } from '@mnemophi/shared'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Auth Store Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset store state
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  describe('Login Flow Integration', () => {
    it('should handle successful login flow', async () => {
      const { result } = renderHook(() => useAuthStore())

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      await act(async () => {
        await result.current.login(loginData)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual({
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        createdAt: expect.any(String),
      })
      expect(result.current.token).toMatch(/^mock-jwt-token-/)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle login loading state', async () => {
      const { result } = renderHook(() => useAuthStore())

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      }

      // Start login
      act(() => {
        result.current.login(loginData)
      })

      // Check loading state
      expect(result.current.isLoading).toBe(true)
      expect(result.current.error).toBe(null)

      // Wait for completion
      await act(async () => {
        await result.current.login(loginData)
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('should handle login error', async () => {
      const { result } = renderHook(() => useAuthStore())

      // Mock a login error by throwing in the login function
      const originalLogin = result.current.login
      result.current.login = jest.fn().mockRejectedValue(new Error('Login failed'))

      await act(async () => {
        try {
          await result.current.login({ email: 'test@example.com', password: 'wrong' })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Login failed')
      expect(result.current.isAuthenticated).toBe(false)

      // Restore original function
      result.current.login = originalLogin
    })
  })

  describe('Registration Flow Integration', () => {
    it('should handle successful registration flow', async () => {
      const { result } = renderHook(() => useAuthStore())

      const registerData = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      }

      await act(async () => {
        await result.current.register(registerData)
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual({
        id: '2',
        email: 'newuser@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'user',
        createdAt: expect.any(String),
      })
      expect(result.current.token).toMatch(/^mock-jwt-token-/)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('should handle registration error', async () => {
      const { result } = renderHook(() => useAuthStore())

      // Mock a registration error
      const originalRegister = result.current.register
      result.current.register = jest.fn().mockRejectedValue(new Error('Registration failed'))

      await act(async () => {
        try {
          await result.current.register({
            email: 'invalid@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
          })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Registration failed')
      expect(result.current.isAuthenticated).toBe(false)

      // Restore original function
      result.current.register = originalRegister
    })
  })

  describe('Logout Flow Integration', () => {
    it('should handle logout flow', async () => {
      const { result } = renderHook(() => useAuthStore())

      // First login
      await act(async () => {
        await result.current.login({ email: 'test@example.com', password: 'password123' })
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).not.toBe(null)

      // Then logout
      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.user).toBe(null)
      expect(result.current.token).toBe(null)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('State Management Integration', () => {
    it('should handle setUser action', () => {
      const { result } = renderHook(() => useAuthStore())

      const user = {
        id: '3',
        email: 'user@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user' as const,
        createdAt: new Date().toISOString(),
      }

      act(() => {
        result.current.setUser(user)
      })

      expect(result.current.user).toEqual(user)
    })

    it('should handle setToken action', () => {
      const { result } = renderHook(() => useAuthStore())

      const token = 'test-jwt-token'

      act(() => {
        result.current.setToken(token)
      })

      expect(result.current.token).toBe(token)
      expect(result.current.isAuthenticated).toBe(true)
    })

    it('should handle clearError action', async () => {
      const { result } = renderHook(() => useAuthStore())

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

    it('should handle setLoading action', () => {
      const { result } = renderHook(() => useAuthStore())

      act(() => {
        result.current.setLoading(true)
      })

      expect(result.current.isLoading).toBe(true)

      act(() => {
        result.current.setLoading(false)
      })

      expect(result.current.isLoading).toBe(false)
    })

    it('should handle setError action', () => {
      const { result } = renderHook(() => useAuthStore())

      const errorMessage = 'Something went wrong'

      act(() => {
        result.current.setError(errorMessage)
      })

      expect(result.current.error).toBe(errorMessage)
    })
  })

  describe('Persistence Integration', () => {
    it('should persist auth state to localStorage', async () => {
      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.login({ email: 'test@example.com', password: 'password123' })
      })

      // Verify localStorage was called
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'auth-storage',
        expect.stringContaining('"user"')
      )
    })

    it('should restore auth state from localStorage', () => {
      const mockStoredState = {
        state: {
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
            createdAt: new Date().toISOString(),
          },
          token: 'stored-token',
          isAuthenticated: true,
        },
        version: 0,
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockStoredState))

      const { result } = renderHook(() => useAuthStore())

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual(mockStoredState.state.user)
      expect(result.current.token).toBe('stored-token')
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle unknown error types', async () => {
      const { result } = renderHook(() => useAuthStore())

      // Mock an error that's not an Error instance
      const originalLogin = result.current.login
      result.current.login = jest.fn().mockRejectedValue('String error')

      await act(async () => {
        try {
          await result.current.login({ email: 'test@example.com', password: 'password123' })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe('Login failed')
      expect(result.current.isLoading).toBe(false)

      // Restore original function
      result.current.login = originalLogin
    })

    it('should handle registration with unknown error types', async () => {
      const { result } = renderHook(() => useAuthStore())

      // Mock an error that's not an Error instance
      const originalRegister = result.current.register
      result.current.register = jest.fn().mockRejectedValue({ message: 'Custom error' })

      await act(async () => {
        try {
          await result.current.register({
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
          })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe('Registration failed')
      expect(result.current.isLoading).toBe(false)

      // Restore original function
      result.current.register = originalRegister
    })
  })
})