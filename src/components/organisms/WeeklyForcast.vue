<script setup lang="ts">
import WeeklyForcastItem from '../molecules/WeeklyForcastItem.vue'

const weeklyForecast = [
  {
    name: 'sunny' as const,
    day: 'Monday',
    weather: 'Sunny',
    temperature: 30,
  },
  {
    name: 'thunderstorm' as const,
    day: 'Tuesday',
    weather: 'Thunderstorms',
    temperature: 19,
  },
  {
    name: 'rainy' as const,
    day: 'Wednesday',
    weather: 'Heavy Rain',
    temperature: 17,
  },
  {
    name: 'moderateRain' as const,
    day: 'Thursday',
    weather: 'Moderate Rain',
    temperature: 17,
  },
]
</script>

<template>
  <section class="weekly-forecast">

    <h2 class="weekly-forecast__title">
      Weekly Forecast
    </h2>

    <div class="weekly-forecast__list">
      <WeeklyForcastItem
        v-for="(forecast, index) in weeklyForecast"
        :key="index"
        :name="forecast.name"
        :day="forecast.day"
        :weather="forecast.weather"
        :temperature="forecast.temperature"
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