<script setup lang="ts">
import dayBackground from '../../assets/weather/day-background.jpg'
import nightBackground from '../../assets/weather/night-background.jpg'
import nightOverlay from '../../assets/weather/night-overlay.jpg'

withDefaults(
  defineProps<{
    location?: string
    time?: string
    description?: string
    temperature?: number
    high?: number
    low?: number
    isNight?: boolean
  }>(),
  {
    location: '',
    time: '',
    description: '',
    temperature: 0,
    high: 0,
    low: 0,
    isNight: false,
  },
)
</script>

<template>
  <article class="weather-card">

    <!-- DAY BACKGROUND -->
    <img
      v-if="!isNight"
      class="weather-card__background weather-card__background--day"
      :src="dayBackground"
      alt=""
    />

    <!-- NIGHT BACKGROUND -->
    <img
      v-if="isNight"
      class="weather-card__background weather-card__background--night"
      :src="nightBackground"
      alt=""
    />

    <!-- NIGHT OVERLAY -->
    <img
      v-if="isNight"
      class="weather-card__night-overlay"
      :src="nightOverlay"
      alt=""
    />

    <!-- DARK SHADE -->
    <div class="weather-card__shade"></div>

    <!-- CONTENT -->
    <div class="weather-card__content">

      <div class="weather-card__top">

        <div class="weather-card__location-info">

          <h3 class="weather-card__location">
            {{ location }}
          </h3>

          <p class="weather-card__time">
            {{ time }}
          </p>

        </div>

        <p class="weather-card__temperature">
          {{ temperature }}°
        </p>

      </div>

      <div class="weather-card__bottom">

        <p class="weather-card__description">
          {{ description }}
        </p>

        <div class="weather-card__range">
          <span>H: {{ high }}°</span>
          <span>L: {{ low }}°</span>
        </div>

      </div>

    </div>

  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  width: 100%;
  height: 115px;
  overflow: hidden;
  border-radius: 16px;
  background: #f5f5f5;
}

/* =========================
   Main background - shared
   ========================= */

.weather-card__background {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  z-index: 0;
}


/* =========================
   DAY background
   ========================= */

.weather-card__background--day {
  object-position: center;
  transform: scale(1.1);
}


/* =========================
   NIGHT background
   ========================= */

.weather-card__background--night {
  object-position: top right;
  transform: scale(1.1);
}

/* =========================
   Night overlay
   ========================= */

.weather-card__night-overlay {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  opacity: 0.6;

  z-index: 1;
}

/* =========================
   Shade
   ========================= */

.weather-card__shade {
  position: absolute;
  inset: 0;

  background: rgb(0 0 0 / 15%);

  z-index: 2;
}

/* =========================
   Content
   ========================= */

.weather-card__content {
  position: relative;

  z-index: 3;

  height: 100%;

  padding: 16px 16px 10px;

  box-sizing: border-box;

  color: white;
}

/* =========================
   Layout
   ========================= */

.weather-card__top,
.weather-card__bottom {
  display: flex;

  justify-content: space-between;
  align-items: flex-start;
}

.weather-card__bottom {
  align-items: flex-end;
  margin-top: 20px;
}

/* =========================
   Text
   ========================= */

.weather-card__location,
.weather-card__time,
.weather-card__temperature,
.weather-card__description {
  margin: 0;
}

.weather-card__location {
  font-size: 20px;
  font-weight: 700;
}

.weather-card__time {
  margin-top: -2px;
  font-size: 14px;
}

.weather-card__temperature {
  margin-top: 10px;
  font-size: 52px;
  font-weight: 250;
}

.weather-card__description {
  font-size: 14px;
}

/* =========================
   High / Low
   ========================= */

.weather-card__range {
  display: flex;
  flex-direction: row;

  gap: 4px;

  font-size: 13px;
}

/* =========================
   Location
   ========================= */

.weather-card__location-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0;
  padding: 0;
}
</style>