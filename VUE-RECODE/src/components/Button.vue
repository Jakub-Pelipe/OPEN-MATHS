<template>
  <button
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      {
        'btn--disabled': disabled,
        'btn--loading': loading,
        'btn--full-width': fullWidth,
      },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <span v-if="loading" class="btn__spinner">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </span>
    <span v-if="!loading" class="btn__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonVariant } from '../types'

interface Props {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

/* Size variants */
.btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Color variants */
.btn--primary {
  background-color: rgb(102, 112, 204);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(102, 112, 204, 0.3);
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: rgb(73, 83, 171);
  box-shadow: 0 6px 20px rgba(73, 83, 171, 0.4);
  transform: translateY(-2px);
}

.btn--secondary {
  background-color: rgba(102, 112, 204, 0.1);
  color: rgb(102, 112, 204);
  border: 2px solid rgb(102, 112, 204);
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: rgba(102, 112, 204, 0.2);
  border-color: rgb(73, 83, 171);
  color: rgb(73, 83, 171);
}

.btn--outline {
  background-color: transparent;
  color: #eee;
  border: 2px solid #eee;
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: rgba(238, 238, 238, 0.1);
  border-color: rgb(102, 112, 204);
  color: rgb(102, 112, 204);
}

.btn--danger {
  background-color: #dc2626;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.btn--danger:hover:not(.btn--disabled) {
  background-color: #b91c1c;
  box-shadow: 0 6px 20px rgba(185, 28, 28, 0.4);
  transform: translateY(-2px);
}

/* Disabled state */
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Full width */
.btn--full-width {
  width: 100%;
}

/* Loading state */
.btn--loading {
  color: transparent;
}

.btn__spinner {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.spinner .path {
  stroke: currentColor;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>