<template>
  <div
    :class="[
      'card',
      `card--shadow-${shadow}`,
      {
        'card--hoverable': hoverable,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hoverable?: boolean
  shadow?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  hoverable: false,
  shadow: 'md',
})
</script>

<style scoped>
.card {
  background: rgba(102, 102, 96, 0.102);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Shadow variants */
.card--shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card--shadow-md {
  box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25), 0 8px 18px rgba(0, 0, 0, 0.05);
}

.card--shadow-lg {
  box-shadow: 0 40px 60px -15px rgba(0, 0, 0, 0.3), 0 20px 25px rgba(0, 0, 0, 0.1);
}

/* Hoverable state */
.card--hoverable {
  cursor: pointer;
}

.card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 40px 60px -15px rgba(0, 0, 0, 0.3), 0 20px 25px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 112, 204, 0.2);
}
</style>