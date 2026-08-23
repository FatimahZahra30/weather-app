<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIconButton from '../components/atoms/AppIconButton.vue'
import WeatherDetailTemplate from '../components/templates/WeatherDetailTemplate.vue'

const router = useRouter()

const goToWeather = () => {
  router.push('/')
}

</script>

<template>
  <main class="weather-detail-page">

    <!-- Icons overlaying hero -->
    <section class="header">
      <AppIconButton
        icon="arrowLeft"
        :size="20"
        @click="goToWeather"
      />

      <AppIconButton
        icon="delete"
        :size="16"
      />
    </section>

    <!-- Weather Details -->
    <WeatherDetailTemplate />

  </main>
</template>

<style scoped>
.weather-detail-page {
  position: relative;

  width: 100%;
  min-height: 100vh;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

/* Icons */

.header {
  position: absolute;

  top: 20px;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 13px;

  box-sizing: border-box;
  color: aliceblue;
}
</style>