import { reactive, computed, ref } from 'vue'
import type { AuthCredentials, SignUpCredentials, AuthUser, AuthState } from '@/types'

export function useAuth() {
  const authState = reactive<AuthState>({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  })

  const token = ref<string | null>(null)

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    return emailRegex.test(email)
  }

  /**
   * Validate password strength
   */
  const isValidPassword = (password: string): boolean => {
    return password.length >= 4
  }

  /**
   * Validate credentials for login
   */
  const validateLoginCredentials = (credentials: AuthCredentials): string | null => {
    if (!credentials.email) {
      return '✉️ Please enter your email address.'
    }
    if (!isValidEmail(credentials.email)) {
      return '📧 Please enter a valid email (e.g., name@domain.com).'
    }
    if (!credentials.password) {
      return '🔐 Password cannot be empty.'
    }
    if (!isValidPassword(credentials.password)) {
      return '🔒 Password must be at least 4 characters.'
    }
    return null
  }

  /**
   * Validate credentials for signup
   */
  const validateSignupCredentials = (credentials: SignUpCredentials): string | null => {
    if (!credentials.name || !credentials.name.trim()) {
      return '👤 Please enter your full name.'
    }
    if (!credentials.email) {
      return '📧 Email address is required for signup.'
    }
    if (!isValidEmail(credentials.email)) {
      return '📧 Please provide a valid email address.'
    }
    if (!credentials.password) {
      return '🔒 Create a password to sign up.'
    }
    if (!isValidPassword(credentials.password)) {
      return '🔐 Password must be at least 4 characters.'
    }
    if (credentials.password !== credentials.confirmPassword) {
      return '⚠️ Passwords do not match. Please re-enter.'
    }
    return null
  }

  /**
   * Perform login
   */
  const login = async (credentials: AuthCredentials): Promise<void> => {
    authState.isLoading = true
    authState.error = null

    try {
      // Validate credentials
      const validationError = validateLoginCredentials(credentials)
      if (validationError) {
        throw new Error(validationError)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Mock successful login
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        name: credentials.email.split('@')[0]
      }

      // Store auth state
      authState.user = user
      authState.isAuthenticated = true
      token.value = `token-${Date.now()}`

      // Store in localStorage (optional)
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(user))

      console.log(`[LOGIN] Logged in as ${user.email}`)
    } catch (error) {
      authState.error = error instanceof Error ? error.message : 'Login failed'
      authState.isAuthenticated = false
      throw error
    } finally {
      authState.isLoading = false
    }
  }

  /**
   * Perform signup
   */
  const signup = async (credentials: SignUpCredentials): Promise<void> => {
    authState.isLoading = true
    authState.error = null

    try {
      // Validate credentials
      const validationError = validateSignupCredentials(credentials)
      if (validationError) {
        throw new Error(validationError)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful signup
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        name: credentials.name
      }

      // Store auth state
      authState.user = user
      authState.isAuthenticated = true
      token.value = `token-${Date.now()}`

      // Store in localStorage (optional)
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(user))

      console.log(`[SIGNUP] Account created for ${user.name} (${user.email})`)
    } catch (error) {
      authState.error = error instanceof Error ? error.message : 'Signup failed'
      authState.isAuthenticated = false
      throw error
    } finally {
      authState.isLoading = false
    }
  }

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    authState.isLoading = true

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      // Clear auth state
      authState.user = null
      authState.isAuthenticated = false
      authState.error = null
      token.value = null

      // Clear localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      console.log('[LOGOUT] User logged out')
    } catch (error) {
      authState.error = error instanceof Error ? error.message : 'Logout failed'
      throw error
    } finally {
      authState.isLoading = false
    }
  }

  /**
   * Restore auth state from localStorage (useful on app init)
   */
  const restoreSession = (): void => {
    try {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')

      if (storedToken && storedUser) {
        token.value = storedToken
        authState.user = JSON.parse(storedUser)
        authState.isAuthenticated = true
      }
    } catch (error) {
      console.error('Failed to restore session:', error)
      logout()
    }
  }

  /**
   * Clear error message
   */
  const clearError = (): void => {
    authState.error = null
  }

  /**
   * Computed: current user
   */
  const currentUser = computed(() => authState.user)

  /**
   * Computed: is authenticated
   */
  const isAuthenticated = computed(() => authState.isAuthenticated)

  /**
   * Computed: is loading
   */
  const isLoading = computed(() => authState.isLoading)

  /**
   * Computed: error message
   */
  const error = computed(() => authState.error)

  return {
    // State
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    token,

    // Methods
    login,
    signup,
    logout,
    restoreSession,
    clearError,
    validateLoginCredentials,
    validateSignupCredentials
  }
}