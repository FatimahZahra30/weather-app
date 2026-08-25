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
  'search-focus': []
  'search-close': []
}>()

const selectLocation = (location: LocationResult) => {
  emit('select-location', location)
  emit('search-close')
}
</script>

<template>
  <div class="search-bar">
    <!-- Search Input -->
    <div class="search-bar__input">
      <AppIcon
        name="search"
        :size="18"
      />

      <AppInput
        :model-value="modelValue"
        placeholder="Search for a city or airport"
        type="search"
        @focus="emit('search-focus')"
        @update:model-value="
          emit('update:modelValue', $event)
        "
      />

      <!-- Clear Button -->
      <button
        v-if="modelValue"
        type="button"
        class="search-bar__clear"
        aria-label="Clear search"
        @click="
          emit('update:modelValue', ''),
          emit('search-close')
        "
      >
        <AppIcon
          name="x"
          :size="15"
        />
      </button>
    </div>

    <!-- Suggestions -->
    <div
      v-if="
        modelValue.trim() &&
        suggestions.length > 0
      "
      class="search-bar__suggestions"
    >
      <button
        v-for="location in suggestions"
        :key="
          `${location.lat}-${location.lon}`
        "
        type="button"
        class="search-bar__suggestion"
        @click.stop.prevent="
          selectLocation(location)
        "
      >
        <div class="suggestion__name">
          {{ location.name }}
        </div>

        <div
          v-if="
            location.country ||
            location.state
          "
          class="suggestion__details"
        >
          <span v-if="location.state">
            {{ location.state }}
          </span>

          <span
            v-if="
              location.state &&
              location.country
            "
          >
            ,
          </span>

          <span v-if="location.country">
            {{ location.country }}
          </span>
        </div>
      </button>
    </div>

    <!-- No Results -->
    <div
      v-else-if="
        modelValue.trim() &&
        suggestions.length === 0
      "
      class="search-bar__no-results"
    >
      No locations found
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  width: 100%;
  z-index: 100;
}

/* Input */
.search-bar__input {
  position: relative;
  z-index: 101;
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

.search-bar__input :deep(.app-input) {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 4px;
  border: none;
  box-shadow: none;
}

.search-bar__input :deep(.app-input:focus) {
  border: none;
  box-shadow: none;
}

/* Clear Button */
.search-bar__clear {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #8C939D;
  cursor: pointer;
}

/* Suggestions */
.search-bar__suggestions {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Suggestion */
.search-bar__suggestion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 14px 4px;
  border: none;
  border-bottom: 1px solid #E5E5E5;
  outline: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.search-bar__suggestion:first-child {
  padding-top: 18px;
}

.search-bar__suggestion:hover {
  background: transparent;
}

.search-bar__suggestion:active {
  background: #F7F7F7;
}

/* Location Name */
.suggestion__name {
  font-size: 15px;
  font-weight: 600;
  color: #201C1C;
}

/* Country / State */
.suggestion__details {
  margin-top: 3px;
  font-size: 13px;
  color: #8C939D;
}

/* No Results */
.search-bar__no-results {
  padding: 18px 4px;
  font-size: 14px;
  color: #8C939D;
}
</style>