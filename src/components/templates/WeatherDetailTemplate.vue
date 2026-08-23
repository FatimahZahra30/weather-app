<script setup lang="ts">
import WeatherHero from '../organisms/WeatherHero.vue'
import HourlyForcast from '../organisms/HourlyForcast.vue'
import WeeklyForcast from '../organisms/WeeklyForcast.vue'
</script>

<template>
  <main class="weather-details-template">

    <!-- Current Weather Details -->
    <section class="weather-details-template__hero">
      <WeatherHero
        name="moderateRain"
        date="Monday, 20 December 2021"
        location="Bangsar South, KL"
        :temperature="24"
        weather="Moderate Rain"
        updateTime="6:00 PM"
      />
    </section>

    <!-- Hourly Forecast -->
    <section class="weather-details-template__section">
      <HourlyForcast />
    </section>

    <!-- Weekly Forecast -->
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

/* Current weather */

.weather-details-template__hero {
  width: 100%;
}

/* Forecast sections */

.weather-details-template__section {
  width: 100%;
  min-width: 0;

  padding: 0 24px;

  box-sizing: border-box;
}
</style>