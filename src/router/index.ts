import { createRouter, createWebHistory } from 'vue-router'

import WeatherPage from '../pages/WeatherPage.vue'
import WeatherDetailPage from '../pages/WeatherDetailPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

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
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
    }
  ],
})

export default router