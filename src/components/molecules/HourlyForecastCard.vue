<script setup lang="ts">
import cloudy from '../../assets/weather-icons/cloudy.png'
import moderateRain from '../../assets/weather-icons/moderate-rain.png'
import nightThunderstorm from '../../assets/weather-icons/night-thunderstorm.png'
import rainy from '../../assets/weather-icons/rainy.png'
import sunny from '../../assets/weather-icons/sunny.png'
import thunderstorm from '../../assets/weather-icons/thunderstorm.png'

/** All the potential weather icons */
const icons = {
  cloudy,
  moderateRain,
  nightThunderstorm,
  rainy,
  sunny,
  thunderstorm,
}

type IconName = keyof typeof icons

/** Props to be passed in for hourly card details */
withDefaults(
  defineProps<{
    name: IconName
    temperature?: number
    time?: string
  }>(),
  {
    temperature: 0,
    time: '',
  },
)
</script>

<template>
  <article class="hourly-forecast-card">
    <img
      class="hourly-forecast-card__icon"
      :src="icons[name]"
      alt=""
    />

    <p class="hourly-forecast-card__temperature">
      {{ temperature }}°
    </p>

    <p class="hourly-forecast-card__time">
      {{ time }}
    </p>
  </article>
</template>

<style scoped>
.hourly-forecast-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 12px 8px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #F5F5F5;
}

/* =========================
   Hourly card item styling
   ========================= */

.hourly-forecast-card__icon {
  width: 35px;
  height: 35px;
  object-fit: contain;
}

.hourly-forecast-card__temperature,
.hourly-forecast-card__time {
  margin: 0;
}

.hourly-forecast-card__temperature {
  margin-top: 3px;
  font-size: 15px;
  font-weight: 600;
  color: #201C1C;
}

.hourly-forecast-card__time {
  margin-top: 4px;
  font-size: 12.5px;
  color: #494343;
}
</style>