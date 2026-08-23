import { createRouter, createWebHistory } from 'vue-router'

import WeatherPage from '../pages/WeatherPage.vue'
import WeatherDetailPage from '../pages/WeatherDetailPage.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'weather',
      component: WeatherPage,
    },
    {
      path: '/weather-details',
      name: 'weather-details',
      component: WeatherDetailPage,
    },
  ],
})

export default router