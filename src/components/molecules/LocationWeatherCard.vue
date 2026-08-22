<script setup lang="ts">
withDefaults(
  defineProps<{
    location?: string
    time?: string
    description?: string
    temperature?: number
    high?: number
    low?: number
    backgroundImage?: string
    overlayImage?: string
    isNight?: boolean
  }>(),
  {
    location: '',
    time: '',
    description: '',
    temperature: 0,
    high: 0,
    low: 0,
    backgroundImage: '',
    overlayImage: '',
    isNight: false,
  },
)
</script>

<template>
  <article class="weather-card">
    <!-- Background image -->
    <img
      v-if="backgroundImage"
      class="weather-card__background"
      :src="backgroundImage"
      alt=""
    />

    <!-- Additional layer used for the night design -->
    <img
      v-if="isNight && overlayImage"
      class="weather-card__overlay"
      :src="overlayImage"
      alt=""
    />

    <!-- Dark overlay to keep text readable -->
    <div class="weather-card__shade"></div>

    <!-- Weather information -->
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
  overflow: hidden;
  border-radius: 16px;
  background: #f5f5f5;
}

/* Main background image */
.weather-card__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  /* Adjust these to match the Figma image */
  object-position: center;
  transform: scale(1.1);

  z-index: 0;
}

/* Additional night layer */
.weather-card__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  object-position: center;
  z-index: 1;
}

/* Slight shade over the images */
.weather-card__shade {
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 15%);
  z-index: 2;
}

/* Actual text/content */
.weather-card__content {
  position: relative;
  z-index: 3;
  height: 100%;
  padding: 16px 16px 10px;
  color: white;
}

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

.weather-card__range {
  display: flex;
  flex-direction: row;
  gap: 4px;
  font-size: 13px;
}

.weather-card__location-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
}
</style>