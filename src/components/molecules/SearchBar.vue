<script setup lang="ts">
import AppIcon from '../atoms/AppIcon.vue'
import AppInput from '../atoms/AppInput.vue'

import type { LocationResult } from '../../api/weather'


/* =========================
   Props
   ========================= */

defineProps<{
  modelValue: string
  suggestions: LocationResult[]
}>()


/* =========================
   Events
   ========================= */

const emit = defineEmits<{
  'update:modelValue': [value: string]

  'select-location': [
    location: LocationResult,
  ]
}>()


/* =========================
   Select Location
   ========================= */

const selectLocation = (
  location: LocationResult,
) => {

  emit(
    'select-location',
    location,
  )

}
</script>


<template>

  <div class="search-bar">


    <!-- =========================
         Search Input
         ========================= -->

    <div class="search-bar__input">

      <AppIcon
        name="search"
        :size="18"
      />

      <AppInput
        :model-value="modelValue"
        placeholder="Search for a city or airport"
        type="search"
        @update:model-value="
          emit(
            'update:modelValue',
            $event,
          )
        "
      />

    </div>


    <!-- =========================
         Suggestions
         ========================= -->

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

          <span
            v-if="location.state"
          >
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


          <span
            v-if="location.country"
          >
            {{ location.country }}
          </span>

        </div>

      </button>

    </div>


    <!-- =========================
         No Results
         ========================= -->

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


/* =========================
   Input
   ========================= */

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


.search-bar__input :deep(
  .app-input:focus
) {

  border: none;

  box-shadow: none;

}


/* =========================
   Suggestions
   ========================= */

.search-bar__suggestions {

  position: absolute;

  top: calc(100% + 6px);

  left: 0;

  right: 0;

  z-index: 9999;

  display: flex;

  flex-direction: column;

  overflow: hidden;

  width: 100%;

  border-radius: 12px;

  background: white;

  box-shadow:
    0 4px 16px
    rgba(0, 0, 0, 0.12);

  pointer-events: auto;

}


/* =========================
   Suggestion
   ========================= */

.search-bar__suggestion {

  display: flex;

  flex-direction: column;

  align-items: flex-start;

  width: 100%;

  margin: 0;

  padding: 12px 14px;

  border: none;

  outline: none;

  background: white;

  text-align: left;

  cursor: pointer;

  pointer-events: auto;

}


.search-bar__suggestion:hover {

  background: #F5F5F5;

}


.search-bar__suggestion:active {

  background: #EEEEEE;

}


/* =========================
   Location Name
   ========================= */

.suggestion__name {

  font-size: 15px;

  font-weight: 600;

  color: #201C1C;

}


/* =========================
   Country / State
   ========================= */

.suggestion__details {

  margin-top: 3px;

  font-size: 13px;

  color: #8C939D;

}


/* =========================
   No Results
   ========================= */

.search-bar__no-results {

  position: absolute;

  top: calc(100% + 6px);

  left: 0;

  right: 0;

  z-index: 9999;

  padding: 14px;

  border-radius: 12px;

  background: white;

  box-shadow:
    0 4px 16px
    rgba(0, 0, 0, 0.12);

  font-size: 14px;

  color: #8C939D;

}

</style>