<script setup lang="ts">
import HourlyForcastCard from '../molecules/HourlyForcastCard.vue'

const hourlyForecast = [
  {
    name: 'sunny' as const,
    temperature: 29,
    time: '2 PM',
  },
  {
    name: 'cloudy' as const,
    temperature: 28,
    time: '3 PM',
  },
  {
    name: 'moderateRain' as const,
    temperature: 27,
    time: '4 PM',
  },
  {
    name: 'thunderstorm' as const,
    temperature: 26,
    time: '5 PM',
  },
  {
    name: 'rainy' as const,
    temperature: 25,
    time: '6 PM',
  },
  {
    name: 'cloudy' as const,
    temperature: 25,
    time: '7 PM',
  },
]
</script>

<template>
  <section class="hourly-forecast">

    <h2 class="hourly-forecast__title">
      Hourly Forecast
    </h2>

    <div class="hourly-forecast__scroll">

      <HourlyForcastCard
        v-for="(forecast, index) in hourlyForecast"
        :key="index"
        :name="forecast.name"
        :temperature="forecast.temperature"
        :time="forecast.time"
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

  font-size: 20px;
  font-weight: 600;

  color: #201C1C;
}

.hourly-forecast__scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  width: 100%;
  min-width: 0;

  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: none;
}

.hourly-forecast__scroll::-webkit-scrollbar {
  display: none;
}

/*
 * 4 cards + 3 gaps = 100%
 *
 * Available width:
 * 100% - 24px of gaps
 *
 * Each card:
 * (100% - 24px) / 4
 */
.hourly-forecast__scroll :deep(.hourly-forecast-card) {
  flex: 0 0 calc((100% - 24px) / 4);
  width: calc((100% - 24px) / 4);
  min-width: calc((100% - 24px) / 4);
}
</style>