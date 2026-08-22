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

    <!-- Hourly forecast -->
    <section class="hourly-section">

      <h2>Hourly Forecast</h2>

      <div class="hourly-forecast-scroll">

        <HourlyForcastCard
          name="sunny"
          :temperature="29"
          time="2:00 PM"
        />

        <HourlyForcastCard
          name="cloudy"
          :temperature="28"
          time="3:00 PM"
        />

        <HourlyForcastCard
          name="moderateRain"
          :temperature="27"
          time="4:00 PM"
        />

        <HourlyForcastCard
          name="thunderstorm"
          :temperature="26"
          time="5:00 PM"
        />

        <HourlyForcastCard
          name="rainy"
          :temperature="25"
          time="6:00 PM"
        />

        <HourlyForcastCard
          name="cloudy"
          :temperature="25"
          time="7:00 PM"
        />

      </div>

    </section>
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

/* Hourly forecast section */
.hourly-section {
  display: block !important;
  width: 100%;
}

.hourly-section h2 {
  margin: 0 0 12px;
}

/* Scroll container */
.hourly-forecast-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;

  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  scrollbar-width: none;
  box-sizing: border-box;
}

.hourly-forecast-scroll::-webkit-scrollbar {
  display: none;
}

/* Exactly 4 cards visible */
.hourly-forecast-scroll > * {
  flex: 0 0 calc((100% - 24px) / 4);
  width: calc((100% - 24px) / 4);
  min-width: 0;
  box-sizing: border-box;
}

</style>