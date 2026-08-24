<script setup lang="ts">
import WeatherHero from '../organisms/WeatherHero.vue'
import HourlyForcast from '../organisms/HourlyForcast.vue'
import WeeklyForcast from '../organisms/WeeklyForcast.vue'

type WeatherIcon =
  | 'cloudy'
  | 'moderateRain'
  | 'rainy'
  | 'sunny'
  | 'thunderstorm'

defineProps<{
  location: string
  date: string
  time: string
  description: string
  icon: WeatherIcon
  temperature: number
  high: number
  low: number
}>()
</script>

<template>

  <main class="weather-details-template">

    <section class="weather-details-template__hero">

      <WeatherHero
        :name="icon"
        :date="date"
        :location="location"
        :temperature="temperature"
        :weather="description"
        :update-time="time"
      />

    </section>


    <section class="weather-details-template__section">

      <HourlyForcast />

    </section>


    <section class="weather-details-template__section">

      <WeeklyForcast />

    </section>

  </main>

</template>


<style scoped>

.weather-details-template {

  display: flex;

  flex-direction: column;

  width: 100%;

  min-width: 0;

  gap: 10px;

  box-sizing: border-box;

}


.weather-details-template__hero {

  width: 100%;

}


.weather-details-template__section {

  width: 100%;

  min-width: 0;

  padding: 0 20px;

  box-sizing: border-box;

}

</style>