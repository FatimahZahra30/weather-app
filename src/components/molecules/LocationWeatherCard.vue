<script setup lang="ts">
withDefaults(
  defineProps<{
    location?: string
    time?: string
    description?: string
    temperature?: number
    high?: number
    low?: number
  }>(),
  {
    location: '',
    time: '',
    description: '',
    temperature: 0,
    high: 0,
    low: 0,
  },
)
</script>

<template>
  <article class="weather-card">
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
  </article>
</template>

<style scoped>
.weather-card {
  width: 100%;
  padding: 16px 16px 10px;
  border-radius: 16px;
  background: #f5f5f5;
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
  font-size: 18px;
  font-weight: 600;
}

.weather-card__time {
  margin-top: 4px;
  font-size: 14px;
}

.weather-card__temperature {
  font-size: 56px;
  font-weight: 300;
  margin-top: 10px;
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
