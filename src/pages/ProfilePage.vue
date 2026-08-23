<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AppIconButton from '../components/atoms/AppIconButton.vue'
import ProfileForm from '../components/organisms/ProfileForm.vue'
import profilePicture from '../assets/profile/profile-picture.png'

interface Profile {
  name: string
  email: string
  phone: string
}

const router = useRouter()

/* =========================
   Profile State
   ========================= */

const isEditing = ref(false)

const profile = ref<Profile>({
  name: 'Jane Doe',
  email: 'jane@gmail.com',
  phone: '123 - 456 - 7890',
})

/* =========================
   Load Saved Profile
   ========================= */

onMounted(() => {
  const savedProfile = localStorage.getItem('profile')

  if (savedProfile) {
    try {
      profile.value = JSON.parse(savedProfile)
    } catch {
      console.error('Failed to load saved profile.')
    }
  }
})

/* =========================
   Navigation
   ========================= */

const goToWeather = () => {
  router.push('/')
}

/* =========================
   Edit Profile
   ========================= */

const startEditing = () => {
  isEditing.value = true
}

/* =========================
   Save Profile
   ========================= */

const handleSave = (updatedProfile: Profile) => {
  profile.value = updatedProfile

  localStorage.setItem(
    'profile',
    JSON.stringify(updatedProfile),
  )

  isEditing.value = false
}
</script>

<template>
  <main class="profile-page">

    <!-- =========================
         Header
         ========================= -->

    <section class="header">

      <AppIconButton
        icon="arrowLeft"
        :size="20"
        @click="goToWeather"
      />

      <p>
        Edit Profile
      </p>

      <!-- Keeps title centered -->
      <div class="header__spacer"></div>

    </section>


    <!-- =========================
         Profile Picture
         ========================= -->

    <section class="profile-header">

      <div class="profile-header__background">

        <img
          :src="profilePicture"
          alt="Profile picture"
          class="profile-header__image"
        />

        <AppIconButton
            v-if="isEditing"
            icon="edit"
            :size="20"
            class="profile-header__edit"
        />

      </div>

    </section>


    <!-- =========================
         Profile Details
         ========================= -->

    <section class="profile-detail">

      <p class="profile-detail__name">
        {{ profile.name }}
      </p>

      <p class="profile-detail__contact">
        {{ profile.email }} | +01 {{ profile.phone.replace(/\s*-\s*/g, ' ') }}
      </p>

    </section>


    <!-- =========================
         Profile Form
         ========================= -->

    <section class="profile-page__form">

      <ProfileForm
        :profile="profile"
        :is-editing="isEditing"
        @edit="startEditing"
        @save="handleSave"
      />

    </section>

  </main>
</template>

<style scoped>
/* =========================
   Page
   ========================= */

.profile-page {
  width: 100%;
  min-height: 100vh;

  box-sizing: border-box;

  color: #201C1C;
}


/* =========================
   Header
   ========================= */

.header {
  position: absolute;

  z-index: 10;

  top: 24px;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;

  width: 100%;

  padding: 0 13px;

  box-sizing: border-box;

  color: #201C1C;
}

.header :deep(.app-icon-button) {
  flex-shrink: 0;
}

.header p {
  position: absolute;

  left: 50%;
  transform: translateX(-50%);

  margin: 0;

  font-size: 22px;
  font-weight: 700;

  color: #201C1C;

  white-space: nowrap;
}

.header__spacer {
  width: 20px;
  height: 20px;

  flex-shrink: 0;
}


/* =========================
   Profile Header
   ========================= */

.profile-header {
  position: relative;

  width: 100%;
  height: 250px;

  overflow: hidden;
}


/* Curved background */

.profile-header__background {
  position: absolute;

  top: 0;
  left: -10%;

  width: 120%;
  height: 170px;

  background: #F5F8FF;

  border-radius: 0 0 45% 45%;
}


/* Profile picture */

.profile-header__image {
  position: absolute;

  z-index: 2;

  left: 50%;

  margin-top: 110px;

  transform: translateX(-50%);

  width: 120px;
  height: 120px;

  border-radius: 50%;

  object-fit: cover;
}

.profile-header__edit {
  position: absolute;

  z-index: 3;

  left: calc(50% + 20px);
  top: 195px;

  width: 43px;
  height: 43px;

  padding: 0;

  border-radius: 50%;

  background-color: #F5F5F5;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 5px solid #FFFFFF;
}


/* =========================
   Profile Details
   ========================= */

.profile-detail {
  width: 100%;

  margin-top: -10px;

  text-align: center;

  box-sizing: border-box;
}

.profile-detail__name {
  margin: 0 0 2px;

  font-size: 15px;
  font-weight: 400;

  color: #201C1C;
}

.profile-detail__contact {
  margin: 0;

  font-size: 15px;
  font-weight: 400;

  color: #201C1C;
}


/* =========================
   Profile Form
   ========================= */

.profile-page__form {
  width: 100%;
  max-width: 600px;

  margin: 0 auto;

  padding: 24px;

  box-sizing: border-box;
}
</style>