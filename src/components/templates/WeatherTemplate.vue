<script setup lang="ts">
import SearchBar from '../molecules/SearchBar.vue'
import LocationWeatherCard from '../molecules/LocationWeatherCard.vue'
import HourlyForcast from '../organisms/HourlyForcast.vue'
import WeeklyForcast from '../organisms/WeeklyForcast.vue'
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <main class="weather-template">

    <!-- Search -->
    <section class="weather-template__search">
      <SearchBar v-model="searchQuery"/>
    </section>

    <!-- Current Weather -->
    <section class="weather-template__current">
      <LocationWeatherCard
        location="Kuala Lumpur"
        time="10:30 AM"
        description="Partly cloudy"
        :temperature="28"
        :high="31"
        :low="24"
      />
    </section>

  </main>
</template>

<style scoped>
.weather-template {
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;

  gap: 24px;

  box-sizing: border-box;
}

/* Search */

.weather-template__search {
  width: 100%;
}

/* Current Weather */

.weather-template__current {
  width: 100%;
}

</style>