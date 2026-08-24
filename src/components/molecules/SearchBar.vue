<script setup lang="ts">
import AppIcon from '../atoms/AppIcon.vue'
import AppInput from '../atoms/AppInput.vue'
import type { LocationResult } from '../../api/weather'

defineProps<{
  modelValue: string
  suggestions: LocationResult[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select-location': [location: LocationResult]
}>()

const handleInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="search-container">

    <div class="search-bar">

      <AppIcon
        name="search"
        :size="18"
      />

      <AppInput
        :model-value="modelValue"
        placeholder="Search for a city or airport"
        type="search"
        @update:model-value="handleInput"
      />

    </div>


    <!-- Suggestions -->

    <div
      v-if="modelValue.trim() && suggestions.length"
      class="search-suggestions"
    >

      <button
        v-for="location in suggestions"
        :key="`${location.lat}-${location.lon}`"
        class="search-suggestion"
        type="button"
        @click="emit('select-location', location)"
      >

        <span class="search-suggestion__name">
          {{ location.name }}
        </span>

        <span class="search-suggestion__details">
          {{ location.state ? `${location.state}, ` : '' }}{{ location.country }}
        </span>

      </button>

    </div>

  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
}


/* =========================
   Search Bar
   ========================= */

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 38px;

  box-sizing: border-box;
  padding: 0 12px;

  border-radius: 12px;

  background: #F5F5F5;
  color: #8C939D;
}

.search-bar :deep(.app-input) {
  flex: 1;

  width: 100%;
  height: 100%;
  min-height: 0;

  padding: 4px;

  border: none;
  box-shadow: none;
}

.search-bar :deep(.app-input:focus) {
  border: none;
  box-shadow: none;
}


/* =========================
   Suggestions
   ========================= */

.search-suggestions {
  position: absolute;

  z-index: 20;

  top: calc(100% + 6px);
  left: 0;
  right: 0;

  overflow: hidden;

  background: #FFFFFF;

  border: 1px solid #EDEDED;
  border-radius: 12px;

  box-shadow: 0 4px 15px rgb(0 0 0 / 8%);
}


/* Individual suggestion */

.search-suggestion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  padding: 11px 14px;

  border: none;

  background: #FFFFFF;

  text-align: left;

  cursor: pointer;
}

.search-suggestion:hover {
  background: #F5F5F5;
}


/* City */

.search-suggestion__name {
  font-size: 14px;
  font-weight: 600;

  color: #201C1C;
}


/* Country / state */

.search-suggestion__details {
  margin-top: 2px;

  font-size: 12px;

  color: #8C939D;
}
</style>