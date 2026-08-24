<script setup lang="ts">

import SearchBar from '../molecules/SearchBar.vue'
import LocationWeatherCard from '../molecules/LocationWeatherCard.vue'

import type { LocationResult } from '../../api/weather'


/* =========================
   Weather Type
   ========================= */

interface WeatherLocation {
  location: string
  lat: number
  lon: number
  time: string
  description: string
  temperature: number
  high: number
  low: number
  isNight: boolean
}


/* =========================
   Props
   ========================= */

const props = defineProps<{

  weatherLocations: WeatherLocation[]

  suggestions: LocationResult[]

  searchQuery: string

}>()


/* =========================
   Events
   ========================= */

const emit = defineEmits<{

  'update:searchQuery': [
    value: string,
  ]

  'select-location': [
    location: LocationResult,
  ]

  'open-location': [
    location: WeatherLocation,
  ]

}>()


/* =========================
   Search
   ========================= */

const handleSearchUpdate = (
  value: string,
) => {

  emit(
    'update:searchQuery',
    value,
  )

}


/* =========================
   Search Result Selected
   ========================= */

const handleLocationSelect = (
  location: LocationResult,
) => {

  emit(
    'select-location',
    location,
  )

}


/* =========================
   Saved Location Selected
   ========================= */

const handleOpenLocation = (
  location: WeatherLocation,
) => {

  emit(
    'open-location',
    location,
  )

}

</script>


<template>

  <main class="weather-template">


    <!-- =========================
         Search
         ========================= -->

    <section
      class="weather-template__search"
    >

      <SearchBar

        :model-value="
          props.searchQuery
        "

        :suggestions="
          props.suggestions
        "

        @update:model-value="
          handleSearchUpdate
        "

        @select-location="
          handleLocationSelect
        "

      />

    </section>


    <!-- =========================
         Saved Locations
         ========================= -->

    <section
      v-if="
        props.weatherLocations.length > 0
      "
      class="weather-template__locations"
    >

      <article
        v-for="
          location in props.weatherLocations
        "
        :key="
          `${location.lat}-${location.lon}`
        "
        class="
          weather-template__location
        "
        @click="
          handleOpenLocation(location)
        "
      >

        <LocationWeatherCard
          :location="location.location"
          :time="location.time"
          :description="location.description"
          :temperature="location.temperature"
          :high="location.high"
          :low="location.low"
          :is-night="location.isNight"
        />

      </article>

    </section>


    <!-- =========================
         Empty State
         ========================= -->

    <section
      v-else
      class="weather-template__empty"
    >

      <p class="empty-title">
        No saved locations
      </p>

      <p class="empty-description">
        Search for a location to get started
      </p>

    </section>


  </main>

</template>


<style scoped>

.weather-template {

  position: relative;

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

  z-index: 100;

}


/* =========================
   Locations
   ========================= */

.weather-template__locations {

  display: flex;

  flex-direction: column;

  width: 100%;

  gap: 18px;

}


/* =========================
   Location
   ========================= */

.weather-template__location {

  width: 100%;

  cursor: pointer;

  transition:
    transform 0.15s ease;

}


.weather-template__location:hover {

  transform: translateY(-2px);

}


.weather-template__location:active {

  transform: scale(0.99);

}


/* =========================
   Empty State
   ========================= */

.weather-template__empty {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  padding: 60px 20px;

  text-align: center;

}


/* =========================
   Empty Title
   ========================= */

.empty-title {

  margin: 0;

  font-size: 20px;

  font-weight: 600;

  color: #201C1C;

}


/* =========================
   Empty Description
   ========================= */

.empty-description {

  margin-top: 8px;

  font-size: 14px;

  color: #8C939D;

}

</style>