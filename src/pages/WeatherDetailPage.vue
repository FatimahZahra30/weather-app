<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppIconButton from '../components/atoms/AppIconButton.vue'
import WeatherDetailTemplate from '../components/templates/WeatherDetailTemplate.vue'
import { getWeather, type DailyForecast, type ForecastItem } from '../api/weather'

import {
  isLocationSaved,
  addSavedLocation,
  removeSavedLocation,
} from '../utils/savedLocations'


/* =========================
   Types
   ========================= */

type WeatherIcon =
  | 'cloudy'
  | 'moderateRain'
  | 'rainy'
  | 'sunny'
  | 'thunderstorm'


/* =========================
   Router
   ========================= */

const router = useRouter()
const route = useRoute()


/* =========================
   Location
   ========================= */

const lat = Number(route.query.lat)
const lon = Number(route.query.lon)


/* =========================
   Saved State
   ========================= */

const isSaved = ref(false)


/* =========================
   Weather State
   ========================= */

const weather = ref<{
  location: string
  date: string
  time: string
  description: string
  icon: WeatherIcon
  temperature: number
  high: number
  low: number
  hourly: ForecastItem[]
  daily: DailyForecast[]
}>({
  location: '',
  date: '',
  time: '',
  description: '',
  icon: 'cloudy',
  temperature: 0,
  high: 0,
  low: 0,
  hourly: [],
  daily: [],
})


const isLoading = ref(true)
const errorMessage = ref('')


/* =========================
   Navigation
   ========================= */

const goToWeather = () => {
  router.push('/')
}


/* =========================
   Add Location
   ========================= */

const addLocation = () => {
  addSavedLocation({
    name: weather.value.location,
    lat,
    lon,
  })

  isSaved.value = true

  // Go back to Home after adding
  router.push('/')
}


/* =========================
   Delete Location
   ========================= */

const deleteLocation = () => {
  removeSavedLocation(
    lat,
    lon,
  )

  isSaved.value = false

  // Go back to Home after deleting
  router.push('/')
}


/* =========================
   Get Local Date + Time
   ========================= */

const getLocalDateTime = (
  timestamp: number,
  timezone: number,
) => {

  const utcTime = timestamp * 1000

  const localTime = new Date(
    utcTime + timezone * 1000,
  )

  return {

    date: localTime.toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    ),

    time: localTime.toLocaleTimeString(
      'en-US',
      {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      },
    ),

  }
}


/* =========================
   Format Description
   ========================= */

const formatDescription = (
  description: string,
) => {

  if (!description) {
    return ''
  }

  return (
    description.charAt(0).toUpperCase() +
    description.slice(1)
  )
}


/* =========================
   Weather Icon Mapping
   ========================= */

const getWeatherIcon = (
  icon: string,
): WeatherIcon => {

  const iconMap: Record<
    string,
    WeatherIcon
  > = {

    '01d': 'sunny',
    '01n': 'cloudy',

    '02d': 'cloudy',
    '02n': 'cloudy',

    '03d': 'cloudy',
    '03n': 'cloudy',

    '04d': 'cloudy',
    '04n': 'cloudy',

    '09d': 'rainy',
    '09n': 'rainy',

    '10d': 'moderateRain',
    '10n': 'rainy',

    '11d': 'thunderstorm',
    '11n': 'thunderstorm',

    '13d': 'cloudy',
    '13n': 'cloudy',

    '50d': 'cloudy',
    '50n': 'cloudy',
  }

  return iconMap[icon] || 'cloudy'
}


/* =========================
   Load Weather
   ========================= */

onMounted(async () => {

  try {

    isLoading.value = true
    errorMessage.value = ''


    /* Check if already saved */

    isSaved.value = isLocationSaved(
      lat,
      lon,
    )


    /* Get weather */

    const data = await getWeather(
      lat,
      lon,
    )


    console.log(
      'DETAIL PAGE WEATHER:',
      data,
    )


    /* Get local date + time */

    const localDateTime =
      getLocalDateTime(
        data.dt,
        data.timezone,
      )


    /* Update weather */

    weather.value = {

      location: data.name,

      date: localDateTime.date,

      time: localDateTime.time,

      description:
        formatDescription(
          data.description,
        ),

      icon:
        getWeatherIcon(
          data.icon,
        ),

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

        hourly: data.hourly,
        daily: data.daily,

    }

  } catch (error) {

    console.error(
      'Weather loading error:',
      error,
    )

    errorMessage.value =
      'Unable to load weather data.'

  } finally {

    isLoading.value = false

  }

})
</script>


<template>

  <main class="weather-detail-page">


    <!-- Header -->

    <section class="header">

      <AppIconButton
        icon="arrowLeft"
        :size="20"
        @click="goToWeather"
      />


      <!-- DELETE if saved -->

      <AppIconButton
        v-if="isSaved"
        icon="delete"
        :size="16"
        @click="deleteLocation"
      />


      <!-- ADD if not saved -->

      <AppIconButton
        v-else
        icon="plus"
        :size="20"
        @click="addLocation"
      />

    </section>


    <!-- Loading -->

    <p
      v-if="isLoading"
      class="status-message"
    >
      Loading weather...
    </p>


    <!-- Error -->

    <p
      v-else-if="errorMessage"
      class="status-message"
    >
      {{ errorMessage }}
    </p>


    <!-- Weather Details -->

    <WeatherDetailTemplate
      v-else
      :location="weather.location"
      :date="weather.date"
      :time="weather.time"
      :description="weather.description"
      :icon="weather.icon"
      :temperature="weather.temperature"
      :high="weather.high"
      :low="weather.low"
      :hourly="weather.hourly"
      :daily="weather.daily"
    />

  </main>

</template>


<style scoped>

.weather-detail-page {
  position: relative;

  width: 100%;
  min-height: 100vh;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
}


.header {
  position: absolute;

  top: 20px;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 13px;

  box-sizing: border-box;

  color: aliceblue;
}


.status-message {
  padding-top: 100px;

  text-align: center;

  font-size: 16px;

  color: #757575;
}

</style>