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

type WeatherIcon =
  | 'cloudy'
  | 'moderateRain'
  | 'rainy'
  | 'sunny'
  | 'thunderstorm'

defineProps<{
  name: WeatherIcon
  location: string
  date: string
  weather: string
  temperature?: number
  updateTime: string
}>()

</script>

<template>
  <article class="weather-hero">

    <!-- Location -->
    <p class="weather-hero__location">
      {{ location }}
    </p>

    <!-- Date -->
    <p class="weather-hero__date">
      {{ date }}
    </p>

    <!-- Weather icon -->
    <img
      class="weather-hero__icon"
      :src="icons[name]"
      alt=""
    />

    <!-- Temperature -->
    <p class="weather-hero__temperature">
      {{ temperature }}° C
    </p>

    <!-- Weather -->
    <p class="weather-hero__weather">
      {{ weather }}
    </p>

    <!-- Updated time -->
    <div class="update">
        <p class="weather-hero__updated">
        Last Update {{ updateTime }}
        </p>

        <AppIconButton 
        class="update-button"
        icon="refresh"
        :size="15"
        />
    </div>

  </article>
</template>

<style scoped>
.weather-hero {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 370px;
  min-width: 0;
  padding: 0px 20px 16px;
  box-sizing: border-box;

  text-align: center;

  background: linear-gradient(
    118.25deg,
    #4F80FA 1.2%,
    #3764D7 59.26%,
    #335FD1 79.2%
  );

  color: white;
}

/* Location */
.weather-hero__location {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  margin-top: 34px;
}

/* Date */
.weather-hero__date {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 400;
  margin-top: 30px;
}

/* Weather icon */
.weather-hero__icon {
  width: 85px;
  height: 85px;
  margin-top: 25px;
  object-fit: contain;
}

/* Temperature */
.weather-hero__temperature {
  margin: 4px 0 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  margin-top: 19px;
}

/* Weather description */
.weather-hero__weather {
  margin: 8px 0 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  margin-top: 20px;
}

/* Bottom update section */
.update {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.weather-hero__updated {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
}

.update-button {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
</style>