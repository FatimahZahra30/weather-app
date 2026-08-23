<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="weather-page">
    <RouterView />
  </main>

</template>

<style scoped>
.weather-page {
  padding: 24px;
}
</style>