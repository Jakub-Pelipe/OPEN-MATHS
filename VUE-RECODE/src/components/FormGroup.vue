<template>
  <fieldset class="form-group">
    <legend v-if="title" class="form-group__title">{{ title }}</legend>
    <div class="form-group__content">
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  columns?: 1 | 2 | 3
}

withDefaults(defineProps<Props>(), {
  columns: 1
})
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  border: none;
  padding: 0;
  margin: 0;
}

.form-group__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #eee;
  margin: 0;
  padding: 0;
  border: none;
  letter-spacing: -0.3px;
}

.form-group__content {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap: 1.3rem;
}

@media (max-width: 768px) {
  .form-group__content {
    grid-template-columns: 1fr;
  }
}
</style>