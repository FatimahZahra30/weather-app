<script setup lang="ts">
import { ref } from 'vue'
import WeatherTemplate from '../components/templates/WeatherTemplate.vue'
import AppIconButton from '../components/atoms/AppIconButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const goToProfile = () => {
  router.push('/profile')
}

const searchQuery = ref('')

const weather = {
  location: 'Kuala Lumpur',
  time: '10:30 AM',
  description: 'Partly cloudy',
  temperature: 28,
  high: 31,
  low: 24,
}
</script>

<template class="weather-pgae">
  <main class="weather-page">
    <section class="header">
    <h3>
      Weather
    </h3>
    <AppIconButton
    icon="profile"
    :size="26"
    @click="goToProfile"
      />
  </section>
  <WeatherTemplate
    v-model:search-query="searchQuery"
    :location="weather.location"
    :time="weather.time"
    :description="weather.description"
    :temperature="weather.temperature"
    :high="weather.high"
    :low="weather.low"
  />
  </main>
</template>

<style scoped>
:global(body) {
  background-color: #ffffff;
}

.weather-page {
  width: 100%;
  min-height: 100vh;

  padding: 24px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 12px;

  color: #201C1C;
}

.header h3 {
  margin: 0;
  font-size: 37px;
  font-weight: 700;
}
</style>