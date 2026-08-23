<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'

const name = ref('Fatimah Zahra')
const email = ref('fatimah@example.com')
const phone = ref('012-345-6789')

const emit = defineEmits<{
  save: [profile: {
    name: string
    email: string
    phone: string
  }]
}>()

const handleSave = () => {
  emit('save', {
    name: name.value,
    email: email.value,
    phone: phone.value,
  })
}

const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement

  let value = input.value.replace(/\D/g, '')

  if (value.length > 10) {
    value = value.slice(0, 10)
  }

  if (value.length > 6) {
    value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`
  } else if (value.length > 3) {
    value = `${value.slice(0, 3)}-${value.slice(3)}`
  }

  phone.value = value
}
</script>

<template>
  <form
    class="profile-form"
    @submit.prevent="handleSave"
  >

    <!-- Name -->
    <div class="profile-form__field">
      <label
        class="profile-form__label"
        for="profile-name"
      >
        Name
      </label>

      <AppInput
        id="profile-name"
        v-model="name"
        type="text"
        placeholder="Enter your name"
        class="profile-form__input"
      />
    </div>

    <!-- Email -->
    <div class="profile-form__field">
      <label
        class="profile-form__label"
        for="profile-email"
      >
        Email
      </label>

      <AppInput
        id="profile-email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="profile-form__input"
      />
    </div>

    <!-- Phone Number -->
    <div class="profile-form__field">
      <label
        class="profile-form__label"
        for="profile-phone"
      >
        Phone Number
      </label>

      <div class="phone-input">

        <span class="phone-input__flag">
          🇺🇸
        </span>

        <input
          id="profile-phone"
          v-model="phone"
          class="phone-input__field"
          type="tel"
          inputmode="numeric"
          maxlength="12"
          placeholder="123-456-7890"
          @input="formatPhone"
        />

      </div>
    </div>

    <!-- Save -->
    <AppButton
      class="profile-form__save"
      type="submit"
    >
      Save Changes
    </AppButton>

  </form>
</template>

<style scoped>
.profile-form {
  display: flex;
  flex-direction: column;

  width: 100%;

  /* Don't add horizontal padding here if
     the playground already controls the spacing */
  box-sizing: border-box;
}

/* =========================
   Form Field
   ========================= */

.profile-form__field {
  display: flex;
  flex-direction: column;

  width: 100%;

  margin-bottom: 18px;
}

/* Field title */

.profile-form__label {
  margin-bottom: 7px;

  font-size: 14px;
  font-weight: 600;

  color: #201C1C;
}

/* =========================
   App Input
   ========================= */

.profile-form__input {
  width: 100%;
  height: 60px;
  font-weight: 500;
}

/* =========================
   Phone Input
   ========================= */

.phone-input {
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  box-sizing: border-box;

  border: 1px solid #D2DFFF;
  border-radius: 10px;
  

  background: #F5F7FC;

  overflow: hidden;
}

/* Flag */

.phone-input__flag {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 100%;

  flex-shrink: 0;
  padding-left: 6px;

  font-size: 18px;
}

/* Number */

.phone-input__field {
  flex: 1;

  width: 100%;
  height: 100%;

  min-width: 0;

  padding: 0 12px 0 0;
  border: none;
  outline: none;

  background: transparent;

  box-sizing: border-box;

  font-family: inherit;
  font-size: 14px;
  font-weight: 500;

  color: #201C1C;
}

.phone-input__field::placeholder {
  color: #999;
}

/* =========================
   Save Button
   ========================= */

.profile-form__save {
  width: 100%;

  margin-top: 6px;
}
</style>