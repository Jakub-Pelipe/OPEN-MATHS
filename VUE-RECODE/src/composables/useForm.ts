import { reactive, computed, ref } from 'vue'
import type { ValidationRules, FormValidationResult } from '@/types'

export interface UseFormOptions {
  initialValues: Record<string, string>
  validationRules?: ValidationRules
  onSubmit?: (values: Record<string, string>) => Promise<void> | void
}

export function useForm(options: UseFormOptions) {
  const { initialValues, validationRules = {}, onSubmit } = options

  // Form state
  const values = reactive<Record<string, string>>({ ...initialValues })
  const errors = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})
  const dirty = reactive<Record<string, boolean>>({})
  const isSubmitting = ref(false)

  /**
   * Validate a single field
   */
  const validate = (fieldName: string, value: string): string => {
    const rules = validationRules[fieldName]
    if (!rules) return ''

    for (const rule of rules) {
      if (!rule.validator(value)) {
        return rule.message
      }
    }
    return ''
  }

  /**
   * Validate all fields
   */
  const validateAll = (): FormValidationResult => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    for (const [fieldName, value] of Object.entries(values)) {
      const error = validate(fieldName, value)
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    }

    Object.assign(errors, newErrors)
    return { isValid, errors: newErrors }
  }

  /**
   * Handle input change
   */
  const handleChange = (fieldName: string, value: string) => {
    values[fieldName] = value
    dirty[fieldName] = true

    // Clear error if field was already touched
    if (touched[fieldName]) {
      errors[fieldName] = validate(fieldName, value)
    }
  }

  /**
   * Handle input blur
   */
  const handleBlur = (fieldName: string) => {
    touched[fieldName] = true
    errors[fieldName] = validate(fieldName, values[fieldName])
  }

  /**
   * Submit form
   */
  const handleSubmit = async () => {
    const { isValid } = validateAll()

    if (!isValid) return

    isSubmitting.value = true
    try {
      if (onSubmit) {
        await onSubmit(values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Reset form to initial state
   */
  const reset = () => {
    Object.assign(values, initialValues)
    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
    Object.keys(touched).forEach((key) => {
      touched[key] = false
    })
    Object.keys(dirty).forEach((key) => {
      dirty[key] = false
    })
  }

  /**
   * Set field value
   */
  const setFieldValue = (fieldName: string, value: string) => {
    values[fieldName] = value
  }

  /**
   * Set field error
   */
  const setFieldError = (fieldName: string, error: string) => {
    errors[fieldName] = error
  }

  /**
   * Get field state
   */
  const getFieldState = (fieldName: string) => ({
    value: values[fieldName],
    error: errors[fieldName],
    touched: touched[fieldName],
    dirty: dirty[fieldName]
  })

  /**
   * Computed: is form valid
   */
  const isValid = computed(() => {
    return Object.values(errors).every((error) => !error)
  })

  /**
   * Computed: is form dirty
   */
  const isDirty = computed(() => {
    return Object.values(dirty).some((isDirtyField) => isDirtyField)
  })

  return {
    values,
    errors,
    touched,
    dirty,
    isSubmitting: computed(() => isSubmitting.value),
    isValid,
    isDirty,
    validate,
    validateAll,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    getFieldState
  }
}