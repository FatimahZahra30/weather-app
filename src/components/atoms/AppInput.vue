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
  height: 44px;

  padding: 0 12px;

  box-sizing: border-box;

  border: 1px solid #F5F5F5;
  border-radius: 10px;

  background: #F5F5F5;

  font-family: inherit;
  font-size: 14px;
  color: #201C1C;

  outline: none;
}

.app-input::placeholder {
  color: #8C939D;
  font-size: 16px;
}

.app-input:focus {
  box-shadow: 0 0 0 3px rgb(37 99 235 / 10%);
}

.app-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>