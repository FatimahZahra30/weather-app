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
import WeatherHero from './components/organisms/WeatherHero.vue'
import HourlyForcast from './components/organisms/HourlyForcast.vue'
import WeeklyForcast from './components/organisms/WeeklyForcast.vue'
import ProfileForm from './components/organisms/ProfileForm.vue'
import WeatherTemplate from './components/templates/WeatherTemplate.vue'
import WeatherDetailTemplate from './components/templates/WeatherDetailTemplate.vue'

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
      weather="Thunderstorms"
      :temperature="19"
      />

      <ProfileForm
        @save="console.log"
      />

    </section>

    <!-- Hourly forecast -->
    <section class="hourly-section">

      <h2>Hourly Forecast</h2>

    </section>

    <section class="hourly-section">
      <HourlyForcast />
    </section>

    <section class="weekly-forecast">
      <WeeklyForcast />
    </section>
    <WeatherTemplate />
    </main>

    <!-- Weather hero -->
    <WeatherHero
      class="hero-full-width"
      name="moderateRain"
      date="Monday, 20 December 2021"
      location="Bangsar South, KL"
      :temperature="24"
      weather="Moderate Rain"
      updateTime="6:00 PM"
    />

    <WeatherDetailTemplate />

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


.hourly-section {
  display: block;
  width: 100%;
}

.hero-full-width {
  margin-bottom: 20px;
}

.weekly-forecast {
  padding-right: 13px;
}
</style>