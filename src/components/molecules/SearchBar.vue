<script setup lang="ts">
import AppIcon from '../atoms/AppIcon.vue'
import AppInput from '../atoms/AppInput.vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="search-bar">
    <AppIcon
      name="search"
      :size="20"
    />

    <AppInput
      :model-value="modelValue"
      placeholder="Search for a city or airport"
      type="search"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0px 12px;
  border-radius: 12px;
  background: #F5F5F5;
  color: #8C939D;
}

.search-bar :deep(.app-input) {
  flex: 1;
  min-height: 44px;
  padding: 8px 4px;
  border: none;
  box-shadow: none;
}

.search-bar :deep(.app-input:focus) {
  border: none;
  box-shadow: none;
}
</style>