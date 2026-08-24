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

import {
  getSavedLocations,
  type SavedLocation,
} from '../utils/savedLocations'


/* =========================
   Router
   ========================= */

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


/* =========================
   Search Locations
   ========================= */

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


/* =========================
   Watch Search Query
   ========================= */

watch(
  searchQuery,
  (query) => {
    handleSearch(query)
  },
)


/* =========================
   Select Search Location
   ========================= */

const handleLocationSelect = (
  location: LocationResult,
) => {

  searchQuery.value = ''

  suggestions.value = []

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
   Saved Locations
   ========================= */

const savedLocations =
  ref<SavedLocation[]>([])


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

}


/* =========================
   Weather State
   ========================= */

const weatherLocations =
  ref<WeatherLocation[]>([])

const isLoading = ref(true)

const errorMessage = ref('')


/* =========================
   Get Local Time
   ========================= */

const getLocalTime = (
  timezone: number,
) => {

  const now = new Date()

  const utcTime =
    now.getTime() +
    now.getTimezoneOffset() * 60 * 1000

  const localTime =
    new Date(
      utcTime + timezone * 1000,
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
   Load Saved Weather
   ========================= */

const loadSavedWeather = async () => {

  try {

    isLoading.value = true

    errorMessage.value = ''


    /* =========================
       Get Saved Locations
       ========================= */

    savedLocations.value =
      getSavedLocations()


    /* =========================
       Nothing Saved
       ========================= */

    if (
      savedLocations.value.length === 0
    ) {

      weatherLocations.value = []

      return

    }


    /* =========================
       Load Weather
       For Every Saved Location
       ========================= */

    const weatherResults =
      await Promise.all(

        savedLocations.value.map(
          async (location) => {

            const data =
              await getWeather(
                location.lat,
                location.lon,
              )

            return {

              location: data.name,

              lat: location.lat,

              lon: location.lon,

              time:
                getLocalTime(
                  data.timezone,
                ),

              description:
                data.description,

              temperature:
                Math.round(
                  data.temperature,
                ),

              high:
                Math.round(
                  data.high,
                ),

              low:
                Math.round(
                  data.low,
                ),

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
   Initial Load
   ========================= */

onMounted(() => {

  loadSavedWeather()

})
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

    <template v-else>


      <!-- =========================
           Saved Location Exists
           ========================= -->

      <WeatherTemplate
        v-if="weatherLocations.length > 0"

        v-model:search-query="
          searchQuery
        "

        :location="
          weatherLocations[0].location
        "

        :time="
          weatherLocations[0].time
        "

        :description="
          weatherLocations[0].description
        "

        :temperature="
          weatherLocations[0].temperature
        "

        :high="
          weatherLocations[0].high
        "

        :low="
          weatherLocations[0].low
        "

        :suggestions="
          suggestions
        "

        @select-location="
          handleLocationSelect
        "
      />


      <!-- =========================
           No Saved Locations
           ========================= -->

      <WeatherTemplate
        v-else

        v-model:search-query="
          searchQuery
        "

        location="No saved locations"

        time=""

        description="
          Search for a location to get started
        "

        :temperature="0"

        :high="0"

        :low="0"

        :suggestions="
          suggestions
        "

        @select-location="
          handleLocationSelect
        "
      />


    </template>


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