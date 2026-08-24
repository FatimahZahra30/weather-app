<script setup lang="ts">
import SearchBar from '../molecules/SearchBar.vue'
import LocationWeatherCard from '../molecules/LocationWeatherCard.vue'

import type { LocationResult } from '../../api/weather'


/* =========================
   Props
   ========================= */

defineProps<{
  location: string
  time: string
  description: string
  temperature: number
  high: number
  low: number

  suggestions: LocationResult[]
}>()


/* =========================
   Search Query
   ========================= */

const searchQuery = defineModel<string>(
  'searchQuery',
  {
    default: '',
  },
)


/* =========================
   Events
   ========================= */

const emit = defineEmits<{
  'select-location': [
    location: LocationResult,
  ]
}>()


/* =========================
   Select Location
   ========================= */

const handleLocationSelect = (
  location: LocationResult,
) => {

  emit(
    'select-location',
    location,
  )

}
</script>


<template>

  <main class="weather-template">


    <!-- =========================
         Search
         ========================= -->

    <section class="weather-template__search">

      <SearchBar
        v-model="searchQuery"
        :suggestions="suggestions"
        @select-location="
          handleLocationSelect
        "
      />

    </section>


    <!-- =========================
         Current Weather
         ========================= -->

    <section
      class="weather-template__current"
    >

      <LocationWeatherCard
        :location="location"
        :time="time"
        :description="description"
        :temperature="temperature"
        :high="high"
        :low="low"
      />

    </section>


  </main>

</template>


<style scoped>

.weather-template {

  display: flex;

  flex-direction: column;

  width: 100%;

  min-width: 0;

  gap: 24px;

  box-sizing: border-box;

}


/* =========================
   Search
   ========================= */

.weather-template__search {

  position: relative;

  width: 100%;

  box-sizing: border-box;

}


/* =========================
   Current Weather
   ========================= */

.weather-template__current {

  width: 100%;

  box-sizing: border-box;

}

</style>