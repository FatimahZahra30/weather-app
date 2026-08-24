<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

import WeatherTemplate from '../components/templates/WeatherTemplate.vue'
import AppIconButton from '../components/atoms/AppIconButton.vue'
import {
  getWeather,
  searchLocations,
  type LocationResult,
} from '../api/weather'

const router = useRouter()

/* =========================
   Navigation
   ========================= */

const goToProfile = () => {
  router.push('/profile')
}

/* =========================
   Search
   ========================= */

const searchQuery = ref('')

const suggestions = ref<LocationResult[]>([])

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    suggestions.value = []
    return
  }

  try {
    suggestions.value = await searchLocations(query)
  } catch (error) {
    console.error(error)
    suggestions.value = []
  }
}

watch(searchQuery, (query) => {
  handleSearch(query)
})

const handleLocationSelect = (location: LocationResult) => {
  searchQuery.value = ''
  suggestions.value = []

  router.push({
    name: 'weather-details',
    query: {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    },
  })
}

/* =========================
   Weather State
   ========================= */

const weather = ref({
  location: '',
  time: '',
  description: '',
  temperature: 0,
  high: 0,
  low: 0,
})

const isLoading = ref(true)
const errorMessage = ref('')

/* =========================
   Get Weather
   ========================= */

const loadWeather = async (
  lat: number,
  lon: number,
) => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const data = await getWeather(lat, lon)

    weather.value = {
      location: data.name,
      time: getLocalTime(data.timezone),
      description: data.description,
      temperature: Math.round(data.temperature),
      high: Math.round(data.high),
      low: Math.round(data.low),
    }

  } catch (error) {
    console.error(error)

    errorMessage.value =
      'Unable to load weather data.'

  } finally {
    isLoading.value = false
  }
}

/* =========================
   Initial Load
   ========================= */

onMounted(async () => {
  try {
    const locations =
      await searchLocations('Kuala Lumpur')

    if (locations.length > 0) {
      const location = locations[0]

      await loadWeather(
        location.lat,
        location.lon,
      )
    }
  } catch (error) {
    console.error(error)
    errorMessage.value =
      'Unable to load weather data.'
  }
})

/* =========================
   Getting Current Timezone
   ========================= */
const getLocalTime = (timezone: number) => {
  const now = new Date()

  const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000

  const localTime = new Date(
    utcTime + timezone * 1000,
  )

  return localTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
</script>

<template>
  <main class="weather-page">

    <!-- =========================
         Header
         ========================= -->

    <section class="header">

      <h3>
        Weather
      </h3>

      <AppIconButton
        icon="profile"
        :size="26"
        @click="goToProfile"
      />

    </section>


    <!-- =========================
         Loading
         ========================= -->

    <p
      v-if="isLoading"
      class="status-message"
    >
      Loading weather...
    </p>


    <!-- =========================
         Error
         ========================= -->

    <p
      v-else-if="errorMessage"
      class="status-message"
    >
      {{ errorMessage }}
    </p>


    <!-- =========================
         Weather
         ========================= -->

    <WeatherTemplate
      v-model:search-query="searchQuery"
      :location="weather.location"
      :time="weather.time"
      :description="weather.description"
      :temperature="weather.temperature"
      :high="weather.high"
      :low="weather.low"
      :suggestions="suggestions"
      @select-location="handleLocationSelect"
    />

  </main>
</template>

<style scoped>
:global(body) {
  background-color: #ffffff;
}

.weather-page {
  width: 100%;
  min-height: 100vh;

  padding: 24px;

  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 12px;

  color: #201C1C;
}

.header h3 {
  margin: 0;

  font-size: 37px;
  font-weight: 700;
}

.status-message {
  margin-top: 40px;

  text-align: center;

  font-size: 16px;
  color: #757575;
}
</style>