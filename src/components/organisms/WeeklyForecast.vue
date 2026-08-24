<script setup lang="ts">
import WeeklyForcastItem from '../molecules/WeeklyForecastItem.vue'

import type { DailyForecast } from '../../api/weather.ts'

type WeatherIcon =
  | 'cloudy'
  | 'moderateRain'
  | 'rainy'
  | 'sunny'
  | 'thunderstorm'

defineProps<{
  daily: DailyForecast[]
}>()

const getWeatherIcon = (
  icon: string,
): WeatherIcon => {

  const iconMap: Record<string, WeatherIcon> = {
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

const formatWeather = (
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
</script>

<template>

  <section class="weekly-forecast">

    <h2 class="weekly-forecast__title">
      Weekly Forecast
    </h2>

    <div class="weekly-forecast__list">

      <WeeklyForcastItem
        v-for="(forecast, index) in daily.slice(0, 5)"
        :key="index"
        :name="getWeatherIcon(forecast.icon)"
        :day="forecast.day"
        :weather="formatWeather(forecast.description)"
        :temperature="Math.round(forecast.temperature)"
      />

    </div>

  </section>

</template>

<style scoped>

.weekly-forecast {
  width: 100%;
  min-width: 0;
}

.weekly-forecast__title {
  margin: 0 0 8px;
  padding-top: 18px;
  padding-bottom: 15px;
  font-size: 21px;
  font-weight: 550;
  text-align: left;
  color: #201C1C;
}

.weekly-forecast__list {
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
}

</style>