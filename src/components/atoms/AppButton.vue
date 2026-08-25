<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)
</script>

<template>
  <button
    :class="['app-button', `app-button--${variant}`]"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  width: 100%;
  min-height: 52px;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

/** Button color variations */
.app-button--primary {
  background: #2563eb;
  color: white;
}

.app-button--secondary {
  background: #e5e7eb;
  color: #111827;
}

.app-button--danger {
  background: #dc2626;
  color: white;
}
</style>