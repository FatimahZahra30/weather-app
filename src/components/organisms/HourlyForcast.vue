<script setup lang="ts">
import cloudy from '../../assets/weather-icons/cloudy.png'
import moderateRain from '../../assets/weather-icons/moderate-rain.png'
import rainy from '../../assets/weather-icons/rainy.png'
import sunny from '../../assets/weather-icons/sunny.png'
import thunderstorm from '../../assets/weather-icons/thunderstorm.png'

const icons = {
  cloudy,
  moderateRain,
  rainy,
  sunny,
  thunderstorm,
}

type IconName = keyof typeof icons

withDefaults(
  defineProps<{
    name: IconName
    temperature?: number
    time: string
  }>(),
  {
    temperature: 0,
  },
)
</script>

<template>
  <article class="hourly-forecast-card">

    <!-- Weather icon -->
    <img
      class="hourly-forecast__icon"
      :src="icons[name]"
      alt=""
    />

    <!-- Temperature -->
    <p class="hourly-forecast__temperature">
      {{ temperature }}°
    </p>

    <!-- Time -->
    <p class="hourly-forecast__time">
      {{ time }}
    </p>

  </article>
</template>

<style scoped>
.hourly-forecast-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Exactly 1/4 of the visible area */
  width: calc(25% - 6px);
  min-width: calc(25% - 6px);

  /* VERY IMPORTANT */
  flex-shrink: 0;

  padding: 12px 8px;

  box-sizing: border-box;

  border-radius: 12px;
  background: #F5F5F5;
}

/* Weather icon */
.hourly-forecast__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

/* Temperature */
.hourly-forecast__temperature {
  margin: 8px 0 0;

  font-size: 18px;
  font-weight: 600;
  line-height: 1;

  color: #201C1C;
}

/* Time */
.hourly-forecast__time {
  margin: 8px 0 0;

  font-size: 14px;
  font-weight: 400;
  line-height: 1;

  color: #201C1C;
}
</style>