<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      :class="[
        'alert',
        `alert--${type}`,
      ]"
      :role="type === 'error' ? 'alert' : 'status'"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
      :aria-atomic="true"
    >
      <div class="alert-content">
        <span class="alert-icon">{{ getIcon }}</span>
        <div class="alert-message">
          <slot>{{ message }}</slot>
        </div>
      </div>
      <button
        v-if="dismissible"
        type="button"
        class="alert-close"
        aria-label="Close message"
        @click="handleDismiss"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { MessageType } from '../types'

interface Props {
  type?: MessageType
  message?: string
  dismissible?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  message: '',
  dismissible: true,
  duration: 5000
})

const emit = defineEmits<{
  dismiss: []
}>()

const isVisible = ref(true)

const getIcon = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'error':
      return '✕'
    case 'warning':
      return '⚠'
    case 'info':
    default:
      return 'ℹ'
  }
})

const handleDismiss = () => {
  isVisible.value = false
  emit('dismiss')
}

onMounted(() => {
  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      handleDismiss()
    }, props.duration)
  }
})
</script>

<style scoped>
.alert {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  border-left: 4px solid;
  font-size: 0.95rem;
  animation: slideIn 0.3s ease-out;
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex: 1;
}

.alert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 1.25rem;
}

.alert-message {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.alert-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: inherit;
  transition: opacity 0.2s;
}

.alert-close:hover {
  opacity: 0.8;
}

/* Type variants */
.alert--success {
  background-color: #e3f7ec;
  color: #1f6e43;
  border-color: #1f6e43;
}

.alert--error {
  background-color: #ffe8e6;
  color: #bc3f2e;
  border-color: #bc3f2e;
}

.alert--warning {
  background-color: #fef3c7;
  color: #92400e;
  border-color: #f59e0b;
}

.alert--info {
  background-color: #dbeafe;
  color: #1e40af;
  border-color: #3b82f6;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .alert {
    font-size: 0.875rem;
    padding: 0.875rem 1rem;
  }

  .alert-icon {
    font-size: 1.1rem;
  }
}
</style>