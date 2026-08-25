<script setup lang="ts">
import AppIcon from './AppIcon.vue'

/** All the icons that can be used as buttons */
const props = withDefaults(
  defineProps<{
    icon: 'arrowLeft' | 'caretRight' | 'chevronRight' | 'profile' | 'edit' | 'plus' | 'refresh' | 'search' | 'delete'
    size?: number
  }>(),
  {
    size: 24,
  },
)

/** Tells the parent that the button had been clicked */
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="icon-button"
    type="button"
    @click="emit('click')"
  >
    <AppIcon
      :name="props.icon"
      :size="props.size"
    />
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.icon-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>