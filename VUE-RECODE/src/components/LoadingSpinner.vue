<template>
  <div class="spinner-container">
    <div :class="['spinner', `spinner--${size}`]" :style="{ color: color }"></div>
    <p v-if="text" class="spinner-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'rgb(102, 112, 204)'
})
</script>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  border: 4px solid rgba(102, 112, 204, 0.2);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner--sm {
  width: 2rem;
  height: 2rem;
  border-width: 2px;
}

.spinner--md {
  width: 3rem;
  height: 3rem;
  border-width: 3px;
}

.spinner--lg {
  width: 4rem;
  height: 4rem;
  border-width: 4px;
}

.spinner-text {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>