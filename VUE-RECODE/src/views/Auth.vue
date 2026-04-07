<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-container">
        <!-- Header with mode toggle -->
        <div class="mode-header">
          <h1 id="formHeading">{{ isLoginMode ? 'Login' : 'Sign Up' }}</h1>
          <button type="button" class="toggle-mode-btn" @click="toggleMode">
            {{ isLoginMode ? 'Switch to Sign Up' : 'Switch to Login' }}
          </button>
        </div>

        <!-- Main form -->
        <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
          <!-- LOGIN FIELDS -->
          <div v-if="isLoginMode" class="field-group">
            <div class="input-group">
              <label for="loginEmail">Email address</label>
              <input
                id="loginEmail"
                v-model="loginForm.email"
                type="email"
                placeholder="hello@example.com"
                autocomplete="email"
                :class="{ 'input-error': errors.email }"
              />
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>
            <div class="input-group">
              <label for="loginPassword">Password</label>
              <input
                id="loginPassword"
                v-model="loginForm.password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                :class="{ 'input-error': errors.password }"
              />
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>
          </div>

          <!-- SIGNUP FIELDS -->
          <div v-else class="field-group">
            <div class="input-group">
              <label for="signupName">User name</label>
              <input
                id="signupName"
                v-model="signupForm.name"
                type="text"
                placeholder="Alex Morgan"
                autocomplete="name"
                :class="{ 'input-error': errors.name }"
              />
              <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
            </div>
            <div class="input-group">
              <label for="signupEmail">Email address</label>
              <input
                id="signupEmail"
                v-model="signupForm.email"
                type="email"
                placeholder="hello@example.com"
                autocomplete="email"
                :class="{ 'input-error': errors.email }"
              />
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>
            <div class="input-group">
              <label for="signupPassword">Create password</label>
              <input
                id="signupPassword"
                v-model="signupForm.password"
                type="password"
                placeholder="create strong password"
                autocomplete="new-password"
                :class="{ 'input-error': errors.password }"
              />
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>
            <div class="input-group">
              <label for="signupConfirm">Confirm password</label>
              <input
                id="signupConfirm"
                v-model="signupForm.confirm"
                type="password"
                placeholder="confirm password"
                autocomplete="off"
                :class="{ 'input-error': errors.confirm }"
              />
              <span v-if="errors.confirm" class="error-text">{{ errors.confirm }}</span>
            </div>
          </div>

          <!-- Submit button -->
          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="!isLoading">
              {{ isLoginMode ? 'Log In' : 'Sign Up' }}
            </span>
            <span v-else>
              {{ isLoginMode ? 'Logging in...' : 'Signing up...' }}
            </span>
          </button>

          <!-- Message area -->
          <div v-if="message.text" :class="['message-area', message.type]">
            {{ message.text }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

// State
const isLoginMode = ref(true)
const isLoading = ref(false)

// Form data
const loginForm = reactive({
  email: '',
  password: ''
})

const signupForm = reactive({
  name: '',
  email: '',
  password: '',
  confirm: ''
})

// Errors
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirm: ''
})

// Message
const message = reactive({
  text: '',
  type: 'error-msg' // 'error-msg' or 'success-msg'
})

// Email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  return emailRegex.test(email)
}

// Clear errors
const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirm = ''
  message.text = ''
}

// Show message
const showMessage = (text: string, type: 'error-msg' | 'success-msg') => {
  message.text = text
  message.type = type

  // Auto-clear success messages after 3.2 seconds
  if (type === 'success-msg') {
    setTimeout(() => {
      if (message.text === text) {
        message.text = ''
      }
    }, 3200)
  }
}

// Validate login form
const validateLogin = (): boolean => {
  clearErrors()

  const emailVal = loginForm.email.trim()
  const passwordVal = loginForm.password

  if (!emailVal) {
    errors.email = '✉️ Please enter your email address.'
    return false
  }
  if (!isValidEmail(emailVal)) {
    errors.email = '📧 Please enter a valid email (e.g., name@domain.com).'
    return false
  }
  if (!passwordVal) {
    errors.password = '🔐 Password cannot be empty.'
    return false
  }
  if (passwordVal.length < 4) {
    errors.password = '🔒 Password must be at least 4 characters (demo rule).'
    return false
  }

  return true
}

// Validate signup form
const validateSignup = (): boolean => {
  clearErrors()

  const nameVal = signupForm.name.trim()
  const emailVal = signupForm.email.trim()
  const passwordVal = signupForm.password
  const confirmVal = signupForm.confirm

  if (!nameVal) {
    errors.name = '👤 Please enter your full name.'
    return false
  }
  if (!emailVal) {
    errors.email = '📧 Email address is required for signup.'
    return false
  }
  if (!isValidEmail(emailVal)) {
    errors.email = '📧 Please provide a valid email address.'
    return false
  }
  if (!passwordVal) {
    errors.password = '🔒 Create a password to sign up.'
    return false
  }
  if (passwordVal.length < 4) {
    errors.password = '🔐 Password must be at least 4 characters (stronger recommended).'
    return false
  }
  if (passwordVal !== confirmVal) {
    errors.confirm = '⚠️ Passwords do not match. Please re-enter.'
    return false
  }

  return true
}

// Handle form submit
const handleSubmit = async () => {
  if (isLoginMode.value) {
    if (!validateLogin()) return

    isLoading.value = true
    // Simulate network request
    setTimeout(() => {
      isLoading.value = false
      showMessage(
        `✨ Welcome back! Logged in as ${loginForm.email} (demo only)`,
        'success-msg'
      )
      console.log(`[LOGIN] email: ${loginForm.email}`)
    }, 700)
  } else {
    if (!validateSignup()) return

    isLoading.value = true
    // Simulate network request
    setTimeout(() => {
      isLoading.value = false
      showMessage(
        `🎉 Account created for ${signupForm.name} (${signupForm.email})! You can now login.`,
        'success-msg'
      )
      console.log(`[SIGNUP] name: ${signupForm.name}, email: ${signupForm.email}`)
      // Reset form and switch back to login mode
      resetForm()
      isLoginMode.value = true
    }, 700)
  }
}

// Toggle between modes
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  resetForm()
  clearErrors()
}

// Reset form
const resetForm = () => {
  loginForm.email = ''
  loginForm.password = ''
  signupForm.name = ''
  signupForm.email = ''
  signupForm.password = ''
  signupForm.confirm = ''
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, 'Segoe UI', 'Inter', 'Helvetica Neue', sans-serif;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #580707, #000000);
  color: #eee;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  padding: 2rem 1rem;
}

/* main card */
.auth-card {
  max-width: 480px;
  width: 100%;
  max-height: 600px;
  background: rgba(102, 102, 96, 0.102);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25), 0 8px 18px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.auth-card:hover {
  transform: translateY(-2px);
}

/* inner padding */
.form-container {
  padding: 2rem;
}

/* header + toggle row */
.mode-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.8rem;
  border-bottom: 2px solid white;
  padding-bottom: 0.75rem;
}

h1 {
  font-size: 1.9rem;
  font-weight: 700;
  background: linear-gradient(135deg, white, grey);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.3px;
  margin: 0;
}

.toggle-mode-btn {
  background: white;
  border: 1.5px solid #cddae9;
  padding: 0.5rem 1.2rem;
  border-radius: 3rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 240, 0.3);
}

.toggle-mode-btn:hover {
  background: #1f2b48;
  border-color: #1f2b48;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* form styling */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 0.8rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #4a5b7a;
  margin-left: 0.25rem;
}

.input-group input {
  padding: 0.9rem 1rem;
  border: 1.5px solid #e2e8f2;
  border-radius: 1.2rem;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.2s;
  outline: none;
  color: #0f172a;
}

.input-group input:focus {
  border-color: #3b5b9b;
  box-shadow: 0 0 0 3px rgba(59, 91, 155, 0.2);
}

.input-error {
  border-color: #dc2626 !important;
  background-color: #fef2f2 !important;
}

.error-text {
  font-size: 0.8rem;
  color: #dc2626;
  margin-left: 0.25rem;
}

/* field groups (login / signup visibility) */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

/* submit button */
.submit-btn {
  background: linear-gradient(105deg, #1f2b48, #2c3e66);
  border: none;
  padding: 0.9rem 1rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.25s;
  margin-top: 0.8rem;
  letter-spacing: 0.3px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(105deg, #141e35, #1f2f4e);
  transform: scale(0.98);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* message area */
.message-area {
  margin-top: 1.4rem;
  font-size: 0.85rem;
  text-align: center;
  padding: 0.6rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, white, grey);
  color: #2c3e66;
  font-weight: 500;
  transition: all 0.2s;
}

.error-msg {
  background: #ffe8e6;
  color: #bc3f2e;
}

.success-msg {
  background: #e3f7ec;
  color: #1f6e43;
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem;
  }

  .mode-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .toggle-mode-btn {
    width: 100%;
    padding: 0.6rem;
  }
}
</style>