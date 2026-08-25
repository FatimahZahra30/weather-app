<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
} from 'vue'

import {
  useRouter,
} from 'vue-router'

import WeatherTemplate from '../components/templates/WeatherTemplate.vue'

import AppIconButton from '../components/atoms/AppIconButton.vue'

import {
  getWeather,
  searchLocations,
  type LocationResult,
} from '../api/weather'

import {
  getSavedLocations,
  type SavedLocation,
} from '../utils/savedLocations'

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

const isSearchFocused = ref(false)

const handleSearchFocus = () => {
  isSearchFocused.value = true
}

const handleSearchClose = () => {
  isSearchFocused.value = false
  searchQuery.value = ''
  suggestions.value = []
}

const handleSearch = async (
  query: string,
) => {
  if (!query.trim()) {
    suggestions.value = []
    return
  }

  try {
    suggestions.value =
      await searchLocations(query)
  } catch (error) {
    console.error(
      'Location search error:',
      error,
    )

    suggestions.value = []
  }
}

watch(
  searchQuery,
  (query) => {
    handleSearch(query)
  },
)

/* =========================
   Select Location
   ========================= */

const handleLocationSelect = (
  location: LocationResult,
) => {
  searchQuery.value = ''
  suggestions.value = []
  isSearchFocused.value = false

  router.push({
    path: '/weather-details',
    query: {
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    },
  })
}

/* =========================
   Weather
   ========================= */

const savedLocations =
  ref<SavedLocation[]>([])

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

const weatherLocations =
  ref<WeatherLocation[]>([])

const isLoading = ref(true)

const errorMessage = ref('')

/* =========================
   Local Time
   ========================= */

const getLocalTime = (
  timezone: number,
) => {
  const now = new Date()

  const utcTime =
    now.getTime() +
    now.getTimezoneOffset() *
    60 *
    1000

  const localTime =
    new Date(
      utcTime +
      timezone * 1000,
    )

  return localTime.toLocaleTimeString(
    [],
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
  )
}

/* =========================
   Day / Night
   ========================= */

const checkIsNight = (
  currentTime: number,
  sunrise: number,
  sunset: number,
) => {
  return (
    currentTime < sunrise ||
    currentTime >= sunset
  )
}

/* =========================
   Load Saved Weather
   ========================= */

const loadSavedWeather =
  async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''

      savedLocations.value =
        getSavedLocations()

      if (
        savedLocations.value.length === 0
      ) {
        weatherLocations.value = []
        return
      }

      const weatherResults =
        await Promise.all(
          savedLocations.value.map(
            async (location) => {
              const data =
                await getWeather(
                  location.lat,
                  location.lon,
                )

              const isNight =
                checkIsNight(
                  data.dt,
                  data.sunrise,
                  data.sunset,
                )

              return {
                location: data.name,
                lat: location.lat,
                lon: location.lon,
                time: getLocalTime(
                  data.timezone,
                ),
                description: data.description,
                temperature: Math.round(
                  data.temperature,
                ),
                high: Math.round(
                  data.high,
                ),
                low: Math.round(
                  data.low,
                ),
                isNight,
              }
            },
          ),
        )

      weatherLocations.value =
        weatherResults
    } catch (error) {
      console.error(
        'Home weather loading error:',
        error,
      )

      errorMessage.value =
        'Unable to load weather data.'
    } finally {
      isLoading.value = false
    }
  }

/* =========================
   Weather Details
   ========================= */

const openWeatherDetails = (
  location: WeatherLocation,
) => {
  router.push({
    path: '/weather-details',
    query: {
      name: location.location,
      lat: location.lat,
      lon: location.lon,
    },
  })
}

/* =========================
   Mounted
   ========================= */

onMounted(() => {
  loadSavedWeather()
})
</script>

<template>
  <main
    class="weather-page"
    :class="{
      'weather-page--searching':
        isSearchFocused,
    }"
  >

    <!-- =========================
         Normal Header
         ========================= -->

    <section
      v-if="!isSearchFocused"
      class="header"
    >
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
         Loading / Error
         ========================= -->

    <p
      v-if="isLoading && !isSearchFocused"
      class="status-message"
    >
      Loading weather...
    </p>

    <p
      v-else-if="
        errorMessage &&
        !isSearchFocused
      "
      class="status-message"
    >
      {{ errorMessage }}
    </p>

    <!-- =========================
         Weather Content
         ========================= -->

   <WeatherTemplate
      v-else
      v-model:search-query="searchQuery"
      :weather-locations="weatherLocations"
      :suggestions="suggestions"
      :is-search-focused="isSearchFocused"
      @select-location="handleLocationSelect"
      @open-location="openWeatherDetails"
      @search-focus="handleSearchFocus"
      @search-close="handleSearchClose"
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
  background: #ffffff;
}

.weather-page--searching {
  padding: 16px 24px 24px;
}

/* =========================
   Header for main page
   ========================= */

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