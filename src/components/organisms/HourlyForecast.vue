<script setup lang="ts">
import HourlyForcastCard from '../molecules/HourlyForecastCard.vue'

import type { ForecastItem } from '../../api/weather.ts'

type WeatherIcon =
  | 'cloudy'
  | 'moderateRain'
  | 'rainy'
  | 'sunny'
  | 'thunderstorm'

defineProps<{
  hourly: ForecastItem[]
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

const formatTime = (
  time: string,
) => {

  const date = new Date(time)

  return date.toLocaleTimeString(
    'en-US',
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    },
  )
}
</script>

<template>

  <section class="hourly-forecast">

    <h2 class="hourly-forecast__title">
      Hourly Forecast
    </h2>

    <div class="hourly-forecast__scroll">

      <HourlyForcastCard
        v-for="(forecast, index) in hourly.slice(0, 6)"
        :key="index"
        :name="getWeatherIcon(forecast.icon)"
        :temperature="Math.round(forecast.temperature)"
        :time="formatTime(forecast.time)"
      />

    </div>

  </section>

</template>

<style scoped>

.hourly-forecast {
  width: 100%;
  min-width: 0;
}

.hourly-forecast__title {
  margin: 0 0 4px;
  padding-top: 18px;
  padding-bottom: 15px;
  font-size: 21px;
  font-weight: 550;
  text-align: left;
  color: #201C1C;
}

.hourly-forecast__scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.hourly-forecast__scroll::-webkit-scrollbar {
  display: none;
}

.hourly-forecast__scroll :deep(.hourly-forecast-card) {
  flex: 0 0 calc((100% - 24px) / 4);
  width: calc((100% - 24px) / 4);
  min-width: calc((100% - 24px) / 4);
}

</style>