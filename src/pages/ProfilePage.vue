<script setup lang="ts">
import AppIconButton from '../components/atoms/AppIconButton.vue'
import ProfileForm from '../components/organisms/ProfileForm.vue'
import profilePicture from '../assets/profile/profile-picture.png'

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

      <p>
        Edit Profile
      </p>

      <div class="header__spacer"></div>

    </section>

    <!-- Profile Picture -->
    <section class="profile-header">

      <div class="profile-header__background">

        <img
          :src="profilePicture"
          alt="Profile picture"
          class="profile-header__image"
        />

      </div>

    </section>

    <!-- Profile Detail -->
     <section class="profile-detail">
        <p>
            Fatimah Zahra
        </p>

        <p>
            fatimah@example.con | +01 012 345 6789
        </p>
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
  right: 24px;

  display: flex;
  align-items: center;

  color: #201C1C;
}

.header p {
  flex: 1;

  margin: 0;

  text-align: center;

  font-size: 22px;
  font-weight: 700;

  color: #201C1C;
}

.header__spacer {
  width: 20px;
  height: 20px;
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

/* Curved blue background */
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

/* =========================
   Profile Form
   ========================= */

.profile-page__form {
  width: 100%;
  max-width: 600px;

  margin: 0 auto;

  box-sizing: border-box;
  padding: 24px;
}

/* =========================
   Profile Detail
   ========================= */
.profile-detail {
    font-size: 14px;
    font-weight: 450;

    margin-top: -10px;
}

</style>