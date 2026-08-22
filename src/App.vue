<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './components/atoms/AppButton.vue'
import AppIcon from './components/atoms/AppIcon.vue'
import AppIconButton from './components/atoms/AppIconButton.vue'
import AppInput from './components/atoms/AppInput.vue'
import SearchBar from './components/molecules/SearchBar.vue'
import LocationWeatherCard from './components/molecules/LocationWeatherCard.vue'

import dayBackground from './assets/weather/day-background.jpg'
import HourlyForcastCard from './components/molecules/HourlyForcastCard.vue'
import WeeklyForcastItem from './components/molecules/WeeklyForcastItem.vue'

const email = ref('')
const searchQuery = ref('')
</script>

<template>
  <main class="playground">
    <h1>Component Playground</h1>

    <section>
      <h2>Buttons</h2>

      <AppButton>Primary</AppButton>

      <AppButton variant="secondary">
        Secondary
      </AppButton>

      <AppButton variant="danger">
        Delete
      </AppButton>

      <AppIcon name="delete" />
      <AppIconButton icon="search" />

     <AppInput
        v-model="email"
        type="email"
        placeholder="Enter your email"
      />

      <p>Current value: {{ email }}</p>

      <SearchBar v-model="searchQuery" />

      <LocationWeatherCard
        location="Kuala Lumpur"
        time="10:30 AM"
        description="Partly cloudy"
        :temperature="28"
        :high="31"
        :low="24"
        :background-image="dayBackground"
      />

      <HourlyForcastCard
        name="sunny"
        :temperature="29"
        time="2:00 PM"
      />

      <WeeklyForcastItem
      name="thunderstorm"
      day="Tuesday"
      weather="Thunderstorm"
      :temperature="19"
      />

    </section>
  </main>
</template>

<style>
.playground {
  padding: 24px;
}

.playground section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>