<script setup lang="ts">
import SearchBar from '../molecules/SearchBar.vue'
import LocationWeatherCard from '../molecules/LocationWeatherCard.vue'

defineProps<{
  location: string
  time: string
  description: string
  temperature: number
  high: number
  low: number
}>()

const searchQuery = defineModel<string>('searchQuery', {
  default: '',
})
</script>

<template>
  <main class="weather-template">

    <section class="weather-template__search">
      <SearchBar v-model="searchQuery" />
    </section>

    <section class="weather-template__current">
      <LocationWeatherCard
        :location="location"
        :time="time"
        :description="description"
        :temperature="temperature"
        :high="high"
        :low="low"
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
  box-sizing: border-box;
}

/* Current Weather */

.weather-template__current {
  width: 100%;
  box-sizing: border-box;
}

</style>