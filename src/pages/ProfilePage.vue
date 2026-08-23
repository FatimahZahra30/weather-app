<script setup lang="ts">
import AppIconButton from '../components/atoms/AppIconButton.vue'
import ProfileForm from '../components/organisms/ProfileForm.vue'

const handleSave = (profile: {
  name: string
  email: string
  phone: string
}) => {
  console.log('Profile saved:', profile)
}
</script>

<template>
  <main class="profile-page">

    <!-- Header -->
    <section class="header">
      <AppIconButton
        icon="arrowLeft"
        :size="20"
      />

      <h1>
        Profile
      </h1>

      <!-- Keeps title centered -->
      <div class="header__spacer"></div>
    </section>

    <!-- Profile Form -->
    <section class="profile-page__form">
      <ProfileForm
        @save="handleSave"
      />
    </section>

  </main>
</template>

<style scoped>
.profile-page {
  width: 100%;
  min-height: 100vh;

  padding: 24px;

  box-sizing: border-box;

  color: #201C1C;
}

/* =========================
   Header
   ========================= */

.header {
  display: flex;
  align-items: center;

  width: 100%;

  margin-bottom: 24px;
}

.header h1 {
  flex: 1;

  margin: 0;

  text-align: center;

  font-size: 24px;
  font-weight: 600;
}

.header__spacer {
  width: 20px;
  height: 20px;
}

/* =========================
   Profile Form
   ========================= */

.profile-page__form {
  width: 100%;
  max-width: 600px;

  margin: 0 auto;

  box-sizing: border-box;
}
</style>