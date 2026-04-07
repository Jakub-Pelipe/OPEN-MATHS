# OPEN Maths - Vue Application

An A-level project dedicated to integrating machine learning into the everyday learning of mathematics.

## Project Structure

```
VUE-RECODE/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.vue       # Button component with variants
│   │   ├── Input.vue        # Input component with validation
│   │   ├── Card.vue         # Card container component
│   │   ├── FormGroup.vue    # Form section wrapper
│   │   ├── LoadingSpinner.vue # Loading indicator
│   │   └── MessageAlert.vue # Alert/message display
│   ├── composables/         # Vue composables/hooks
│   │   ├── useForm.ts       # Form state and validation
│   │   ├── useAuth.ts       # Authentication logic
│   │   └── useMessage.ts    # Message management
│   ├── layouts/             # Layout components
│   │   └── AppLayout.vue    # Main application layout
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types
│   ├── assets/              # Static assets
│   │   └── main.css         # Global styles
│   └── App.vue              # Root component
└── package.json             # Dependencies
```

## Features

### 🎨 UI Components

#### Button Component
Versatile button component with multiple variants and sizes.

**Props:**
- `variant` - 'primary' | 'secondary' | 'outline' | 'danger' (default: 'primary')
- `size` - 'sm' | 'md' | 'lg' (default: 'md')
- `disabled` - boolean (default: false)
- `loading` - boolean (default: false)
- `fullWidth` - boolean (default: false)

**Usage:**
```vue
<template>
  <Button variant="primary" size="md" @click="handleClick">
    Click Me
  </Button>
  
  <Button variant="outline" :disabled="isLoading">
    Secondary Action
  </Button>
  
  <Button variant="danger" fullWidth>
    Delete
  </Button>
</template>
```

#### Input Component
Comprehensive input field with validation and error handling.

**Props:**
- `modelValue` - string (required)
- `type` - 'text' | 'email' | 'password' | 'number' | 'textarea' (default: 'text')
- `label` - string
- `placeholder` - string
- `error` - string (error message)
- `required` - boolean (default: false)
- `disabled` - boolean (default: false)
- `name` - string

**Usage:**
```vue
<template>
  <Input
    v-model="email"
    type="email"
    label="Email Address"
    placeholder="user@example.com"
    :error="emailError"
    required
    @blur="validateEmail"
  />
  
  <Input
    v-model="password"
    type="password"
    label="Password"
    placeholder="••••••••"
    :error="passwordError"
    required
  />
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const validateEmail = () => {
  // Validation logic
}
</script>
```

#### Card Component
Flexible container component with shadow and hover effects.

**Props:**
- `hoverable` - boolean (default: false)
- `shadow` - 'sm' | 'md' | 'lg' (default: 'md')

**Usage:**
```vue
<template>
  <Card hoverable shadow="lg">
    <div class="p-lg">
      <h3>Card Title</h3>
      <p>Card content goes here</p>
    </div>
  </Card>
</template>
```

#### FormGroup Component
Wraps form fields with optional title and description.

**Props:**
- `title` - string
- `description` - string
- `columns` - 1 | 2 | 3 (default: 1)

**Usage:**
```vue
<template>
  <FormGroup title="Personal Information">
    <Input v-model="name" label="Full Name" />
    <Input v-model="email" type="email" label="Email" />
  </FormGroup>
</template>
```

#### LoadingSpinner Component
Animated loading indicator for async operations.

**Props:**
- `size` - 'sm' | 'md' | 'lg' (default: 'md')
- `color` - string (default: 'rgb(102, 112, 204)')
- `text` - string (optional loading text)

**Usage:**
```vue
<template>
  <LoadingSpinner size="md" text="Loading..." />
</template>
```

#### MessageAlert Component
Alert component for displaying messages with auto-dismiss.

**Props:**
- `type` - 'success' | 'error' | 'info' | 'warning' (required)
- `message` - string (required)
- `dismissible` - boolean (default: true)
- `duration` - number (auto-close duration in ms)

**Usage:**
```vue
<template>
  <MessageAlert
    type="success"
    message="Profile updated successfully!"
    :duration="3000"
  />
  
  <MessageAlert
    type="error"
    message="An error occurred. Please try again."
    dismissible
  />
</template>
```

### 🎯 Composables

#### useForm Composable
Manage form state, validation, and submission with ease.

**Options:**
```typescript
interface UseFormOptions {
  initialValues: Record<string, string>
  validationRules?: ValidationRules
  onSubmit?: (values: Record<string, string>) => Promise<void> | void
}
```

**Returns:**
- `values` - reactive form values
- `errors` - reactive validation errors
- `touched` - field touched state
- `dirty` - field dirty state
- `isSubmitting` - submission state
- `isValid` - computed validity
- `isDirty` - computed if form is dirty
- `validate()` - validate single field
- `validateAll()` - validate all fields
- `handleChange()` - handle input change
- `handleBlur()` - handle input blur
- `handleSubmit()` - submit form
- `reset()` - reset form to initial state
- `setFieldValue()` - set field value
- `setFieldError()` - set field error
- `getFieldState()` - get field state

**Example:**
```typescript
import { useForm } from '@/composables/useForm'

const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationRules: {
    email: [
      {
        validator: (value) => !!value,
        message: 'Email is required'
      },
      {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Invalid email format'
      }
    ],
    password: [
      {
        validator: (value) => value.length >= 4,
        message: 'Password must be at least 4 characters'
      }
    ]
  },
  onSubmit: async (values) => {
    await loginAPI(values)
  }
})
```

#### useAuth Composable
Handle authentication state and operations.

**Methods:**
- `login(credentials: AuthCredentials)` - Login with email/password
- `signup(credentials: SignUpCredentials)` - Sign up new user
- `logout()` - Logout current user
- `restoreSession()` - Restore auth from localStorage
- `clearError()` - Clear error message
- `validateLoginCredentials()` - Validate login inputs
- `validateSignupCredentials()` - Validate signup inputs

**Returns:**
- `currentUser` - computed user object
- `isAuthenticated` - computed auth state
- `isLoading` - computed loading state
- `error` - computed error message
- `token` - ref to auth token

**Example:**
```typescript
import { useAuth } from '@/composables/useAuth'

const { login, currentUser, isAuthenticated, error } = useAuth()

const handleLogin = async () => {
  try {
    await login({
      email: 'user@example.com',
      password: 'password123'
    })
    // User logged in successfully
  } catch (err) {
    console.error(err)
  }
}
```

#### useMessage Composable
Manage application messages with auto-clearing.

**Methods:**
- `add(text, type, duration)` - Add a message
- `success(text, duration)` - Add success message
- `error(text, duration)` - Add error message
- `warning(text, duration)` - Add warning message
- `info(text, duration)` - Add info message
- `remove(id)` - Remove message by ID
- `clear()` - Clear all messages
- `getMessageById(id)` - Get message by ID
- `updateMessage(id, text)` - Update message text

**Returns:**
- `messages` - computed array of messages
- `count` - computed message count
- `hasMessages` - computed if has messages

**Example:**
```typescript
import { useMessage } from '@/composables/useMessage'

const { success, error, messages } = useMessage()

const handleSave = async () => {
  try {
    await saveData()
    success('Data saved successfully!', 3000)
  } catch (err) {
    error('Failed to save data', 5000)
  }
}
```

### 🎨 Design System

#### Color Palette

- **Primary**: `rgb(102, 112, 204)` - Purple/Blue accent color
- **Primary Hover**: `rgb(73, 83, 171)` - Darker purple
- **Background**: Radial gradient from `#580707` (dark red) to `#000000` (black)
- **Text**: `#eee` (light gray), `#ffffff` (white)
- **Secondary**: `#3b5b9b` (blue)
- **Success**: `#10b981` (green)
- **Error**: `#dc2626` (red)
- **Warning**: `#f59e0b` (orange)
- **Info**: `#3b82f6` (blue)

#### Typography

- **Font Family**: Inter, Segoe UI, Helvetica Neue
- **Base Size**: 16px
- **Line Height**: 1.6
- **Headings**: Font weight 700, letter-spacing -0.3px

#### Spacing Scale

- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 1rem (base)
- `lg`: 1.5rem
- `xl`: 2rem
- `2xl`: 3rem

#### Border Radius

- `sm`: 0.375rem
- `md`: 0.5rem
- `lg`: 1rem
- `xl`: 1.5rem
- `2xl`: 2rem
- `full`: 9999px

### 🎭 Layouts

#### AppLayout Component
Main application layout with sticky header and footer.

**Slots:**
- `default` - Main content
- `header-actions` - Header right side actions
- `footer-links` - Footer links

**Props:**
- `navItems` - Navigation menu items
- `footerText` - Footer text

**Example:**
```vue
<template>
  <AppLayout>
    <template #header-actions>
      <Button variant="secondary">Login</Button>
    </template>
    
    <div class="container">
      <!-- Page content -->
    </div>
    
    <template #footer-links>
      <a href="#privacy">Privacy Policy</a>
      <a href="#terms">Terms of Service</a>
    </template>
  </AppLayout>
</template>
```

## Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation Steps

```bash
# Clone repository
git clone https://github.com/Jakub-Pelipe/OPEN-MATHS.git
cd VUE-RECODE

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

## Usage Examples

### Login Form
```vue
<template>
  <Card shadow="lg">
    <div class="p-lg">
      <h2>Login</h2>
      
      <FormGroup>
        <Input
          v-model="form.values.email"
          type="email"
          label="Email Address"
          :error="form.errors.email"
          @blur="form.handleBlur('email')"
          @input="form.handleChange('email', $event.target.value)"
        />
        
        <Input
          v-model="form.values.password"
          type="password"
          label="Password"
          :error="form.errors.password"
          @blur="form.handleBlur('password')"
          @input="form.handleChange('password', $event.target.value)"
        />
      </FormGroup>
      
      <Button
        variant="primary"
        fullWidth
        :loading="auth.isLoading.value"
        @click="form.handleSubmit"
      >
        {{ auth.isLoading.value ? 'Logging in...' : 'Login' }}
      </Button>
      
      <MessageAlert
        v-if="auth.error.value"
        type="error"
        :message="auth.error.value"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { useAuth } from '@/composables/useAuth'
import { useMessage } from '@/composables/useMessage'
import Card from '@/components/Card.vue'
import FormGroup from '@/components/FormGroup.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import MessageAlert from '@/components/MessageAlert.vue'

const auth = useAuth()
const message = useMessage()

const form = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationRules: {
    email: [
      {
        validator: (v) => !!v,
        message: 'Email is required'
      },
      {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email format'
      }
    ],
    password: [
      {
        validator: (v) => v.length >= 4,
        message: 'Password must be at least 4 characters'
      }
    ]
  },
  onSubmit: async (values) => {
    try {
      await auth.login({
        email: values.email,
        password: values.password
      })
      message.success('Logged in successfully!')
    } catch (error) {
      message.error('Login failed. Please try again.')
    }
  }
})
</script>

<style scoped>
.p-lg {
  padding: 1.5rem;
}
</style>
```

### Signup Form
```vue
<template>
  <Card shadow="lg">
    <div class="p-lg">
      <h2>Create Account</h2>
      
      <FormGroup>
        <Input
          v-model="form.values.name"
          type="text"
          label="Full Name"
          :error="form.errors.name"
          required
        />
        
        <Input
          v-model="form.values.email"
          type="email"
          label="Email Address"
          :error="form.errors.email"
          required
        />
        
        <Input
          v-model="form.values.password"
          type="password"
          label="Password"
          :error="form.errors.password"
          required
        />
        
        <Input
          v-model="form.values.passwordConfirm"
          type="password"
          label="Confirm Password"
          :error="form.errors.passwordConfirm"
          required
        />
      </FormGroup>
      
      <Button
        variant="primary"
        fullWidth
        :loading="auth.isLoading.value"
      >
        {{ auth.isLoading.value ? 'Creating Account...' : 'Sign Up' }}
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/useForm'
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()

const form = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  },
  validationRules: {
    name: [
      {
        validator: (v) => !!v.trim(),
        message: 'Name is required'
      }
    ],
    email: [
      {
        validator: (v) => !!v,
        message: 'Email is required'
      },
      {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email format'
      }
    ],
    password: [
      {
        validator: (v) => v.length >= 4,
        message: 'Password must be at least 4 characters'
      }
    ],
    passwordConfirm: [
      {
        validator: (v) => v === form.values.password,
        message: 'Passwords do not match'
      }
    ]
  },
  onSubmit: async (values) => {
    await auth.signup({
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.passwordConfirm
    })
  }
})
</script>
```

## Type Safety

All components and composables are fully typed with TypeScript.

### Common Types

```typescript
// Authentication
interface AuthCredentials {
  email: string
  password: string
}

interface SignUpCredentials extends AuthCredentials {
  name: string
  confirmPassword: string
}

interface AuthUser {
  id: string
  email: string
  name: string
}

// Form
interface FormField {
  value: string
  error: string
  touched: boolean
  dirty: boolean
}

interface ValidationRule {
  validator: (value: string) => boolean
  message: string
}

// Messages
type MessageType = 'success' | 'error' | 'warning' | 'info'

interface Message {
  id: string
  type: MessageType
  text: string
  duration?: number
}
```

## CSS Classes & Utilities

The application includes a comprehensive set of utility classes for styling:

### Flexbox
- `.flex`, `.flex-col`, `.flex-row`
- `.items-center`, `.items-start`, `.items-end`
- `.justify-center`, `.justify-between`, `.justify-start`, `.justify-end`
- `.gap-sm`, `.gap-md`, `.gap-lg`

### Spacing
- `.p-sm`, `.p-md`, `.p-lg` - Padding
- `.m-sm`, `.m-md`, `.m-lg` - Margin
- `.px-md`, `.py-lg` - Horizontal/Vertical padding
- `.mt-md`, `.mb-lg` - Top/Bottom margin

### Text
- `.text-sm`, `.text-lg`, `.text-2xl` - Font sizes
- `.text-center`, `.text-left`, `.text-right` - Text alignment
- `.font-bold`, `.font-semibold`, `.font-light` - Font weights
- `.text-primary`, `.text-secondary`, `.text-muted` - Text colors

### Backgrounds
- `.bg-primary`, `.bg-primary-light`
- `.bg-success`, `.bg-error`, `.bg-warning`, `.bg-info`

### Display
- `.hidden`, `.invisible` - Visibility
- `.grid-cols-2`, `.grid-cols-3` - Grid layouts
- `.w-full`, `.h-full` - Size utilities

### Animations
- `.animate-spin` - Spinning animation
- `.animate-pulse` - Pulsing animation
- `.animate-bounce` - Bouncing animation

## Best Practices

### Form Validation
1. Use `useForm` composable for all forms
2. Validate on blur for user feedback
3. Show validation errors near inputs
4. Disable submit button until form is valid

### Authentication
1. Use `useAuth` for all auth operations
2. Restore session on app initialization
3. Handle errors gracefully
4. Clear sensitive data on logout

### Styling
1. Use CSS variables for consistency
2. Follow the component variant patterns
3. Maintain dark theme throughout
4. Use utility classes for responsive design

### Components
1. Keep components focused and single-responsibility
2. Use TypeScript for prop types
3. Expose meaningful events
4. Support accessibility standards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and questions, please open an issue on GitHub:
https://github.com/Jakub-Pelipe/OPEN-MATHS

## Authors

- Jakub Pelipe - Original OPEN MATHS project
- Vue Application Team - Vue.js implementation

---

**Last Updated:** 2024
**Version:** 1.0.0