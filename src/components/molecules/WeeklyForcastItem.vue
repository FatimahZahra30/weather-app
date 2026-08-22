<script setup lang="ts">
import cloudy from '../../assets/weather-icons/cloudy.png'
import moderateRain from '../../assets/weather-icons/moderate-rain.png'
import rainy from '../../assets/weather-icons/rainy.png'
import sunny from '../../assets/weather-icons/sunny.png'
import thunderstorm from '../../assets/weather-icons/thunderstorm.png'
import AppIconButton from '../atoms/AppIconButton.vue'

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
    day: string
    weather: string
    temperature?: number
  }>(),
  {
    temperature: 0,
  },
)
</script>

<template>
  <article class="weekly-forcast-item">

    <!-- Weather icon -->
    <div class="weekly-icon-container">
      <img
        class="weekly-forcast-icon"
        :src="icons[name]"
        alt=""
      />
    </div>

    <!-- Day + weather -->
    <div class="weekly-forcast-details">
      <p class="weekly-forcast__day">
        {{ day }}
      </p>

      <p class="weekly-forcast__weather">
        {{ weather }}
      </p>
    </div>

    <!-- Temperature + caret -->
    <div class="weekly-forcast-right">
      <p class="weekly-forcast-temperature">
        {{ temperature }}°
      </p>

      <AppIconButton
        class="right-icon"
        icon="caretRight"
        :size="13"
      />
    </div>

  </article>
</template>

<style scoped>
.weekly-forcast-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  padding: 13px 13px;
  border-radius: 12px;
  background: #D2DFFF;
}

/* Weather icon */
.weekly-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #9AB6FF;
}

.weekly-forcast-icon {
  width: 35px;
  height: 35px;
  object-fit: contain;
}

/* Day + weather */
.weekly-forcast-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
  margin-left: 12px;
}

.weekly-forcast__day,
.weekly-forcast__weather {
  margin: 0;
  color: #201C1C;
}

.weekly-forcast__day {
  font-size: 16px;
  font-weight: 600;
}

.weekly-forcast__weather {
  margin-top: 1.5px;
  font-size: 14px;
  font-weight: 400;
}

/* Temperature + caret */
.weekly-forcast-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.weekly-forcast-temperature {
  margin: 0;
  font-size: 18px;
  font-weight: 560;
  color: #201C1C;
}

.right-icon {
  margin-left: 5px;
}
</style>