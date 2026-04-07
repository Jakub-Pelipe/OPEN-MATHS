<template>
  <div class="form-group">
    <label v-if="label" :for="inputId" class="form-label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="label-required">*</span>
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-label="label || placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="form-input form-textarea"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    ></textarea>
    <input
      v-else
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-label="label || placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="form-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <p v-if="error" :id="errorId" class="form-error">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputType } from '../types'

interface Props {
  modelValue: string
  type?: InputType
  label?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
  focus: []
}>()

const inputId = computed(() => `input-${props.name || Math.random().toString(36).substr(2, 9)}`)
const errorId = computed(() => `${inputId.value}-error`)
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #4a5b7a;
  margin-left: 0.25rem;
}

.label-text {
  display: inline;
}

.label-required {
  color: #dc2626;
  margin-left: 0.25rem;
}

.form-input {
  padding: 0.9rem 1rem;
  border: 1.5px solid #e2e8f2;
  border-radius: 1.2rem;
  font-size: 1rem;
  background: #ffffff;
  color: #0f172a;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  transition: all 0.2s;
  outline: none;
}

.form-input:focus {
  border-color: #3b5b9b;
  box-shadow: 0 0 0 3px rgba(59, 91, 155, 0.2);
}

.form-input:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.form-input[aria-invalid='true'] {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-error {
  font-size: 0.75rem;
  color: #dc2626;
  margin: 0;
  margin-left: 0.25rem;
  font-weight: 500;
}
</style>