<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    type?: 'text' | 'email' | 'tel' | 'search'
    disabled?: boolean
    required?: boolean
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    required: false,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :aria-label="ariaLabel"
    class="app-input"
    @input="
      emit(
        'update:modelValue',
        ($event.target as HTMLInputElement).value,
      )
    "
  />
</template>

<style scoped>
.app-input {
  width: 100%;
  min-height: 52px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #111827;
  font: inherit;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.app-input::placeholder {
  color: #9ca3af;
}

.app-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
}

.app-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>