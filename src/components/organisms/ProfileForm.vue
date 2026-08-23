<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '../atoms/AppButton.vue'
import AppInput from '../atoms/AppInput.vue'

const name = ref('Fatimah Zahra')
const email = ref('fatimah@example.com')
const phone = ref('012 - 345 - 6789')

const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')

const validateForm = () => {
  nameError.value = ''
  emailError.value = ''
  phoneError.value = ''

  let isValid = true

  // Name
  if (!name.value.trim()) {
    nameError.value = 'Name is required.'
    isValid = false
  }

  // Email
  if (!email.value.trim()) {
    emailError.value = 'Email is required.'
    isValid = false
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email.value)) {
      emailError.value = 'Please enter a valid email address.'
      isValid = false
    }
  }

  // Phone
  const phoneDigits = phone.value.replace(/\D/g, '')

  if (!phoneDigits) {
    phoneError.value = 'Phone number is required.'
    isValid = false
  } else if (phoneDigits.length !== 10) {
    phoneError.value = 'Please enter a valid 10-digit phone number.'
    isValid = false
  }

  return isValid
}

const emit = defineEmits<{
  save: [profile: {
    name: string
    email: string
    phone: string
  }]
}>()

const handleSave = () => {
  if (!validateForm()) {
    return
  }

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
    value = `${value.slice(0, 3)} - ${value.slice(3, 6)} - ${value.slice(6)}`
  } else if (value.length > 3) {
    value = `${value.slice(0, 3)} - ${value.slice(3)}`
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
        Full Name
    </label>

    <AppInput
        id="profile-name"
        v-model="name"
        type="text"
        placeholder=""
        class="profile-form__input"
        :class="{ 'profile-form__input--error': nameError }"
        />

        <p
            v-if="nameError"
            class="profile-form__error"
        >
            {{ nameError }}
        </p>
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
        :class="{ 'profile-form__input--error': emailError }"
        />

        <p
            v-if="emailError"
            class="profile-form__error"
        >
            {{ emailError }}
        </p>
        </div>

    <!-- Phone Number -->
    <div class="profile-form__field">
    <label
        class="profile-form__label"
        for="profile-phone"
    >
        Phone Number
    </label>

    <div
        class="phone-input"
        :class="{ 'phone-input--error': phoneError }"
    >
        <span class="phone-input__flag">
        🇺🇸
        </span>

        <input
        id="profile-phone"
        v-model="phone"
        class="phone-input__field"
        type="tel"
        inputmode="numeric"
        maxlength="16"
        placeholder="123 - 456 - 7890"
        @input="formatPhone"
        />
    </div>

    <!-- Error OUTSIDE phone-input -->
    <p
        v-if="phoneError"
        class="profile-form__error"
    >
        {{ phoneError }}
    </p>
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
  position: relative;

  width: 100%;

  margin-bottom: 15px;
}

.profile-form__label {
  position: absolute;
  top: 3px;
  left: 12px;

  z-index: 2;

  margin: 0;

  font-size: 8px;
  font-weight: 500;

  color: #757575;

  pointer-events: none;
}

.profile-form__input {
  width: 100%;
  height: 55px;

  box-sizing: border-box;

  padding: 18px 12px 6px;

  font-weight: 500;
}
/* =========================
   Phone Input
   ========================= */

.phone-input {
  display: flex;
  align-items: center;

  width: 100%;
  height: 55px;

  box-sizing: border-box;

  border: 1px solid #F5F5F5;
  border-radius: 10px;
  

  background: #F5F5F5;

  overflow: hidden;
}

/* Flag */

.phone-input__flag {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 100%;
  padding-top: 15px;

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

  padding: 15px 12px 0 0;
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

.profile-form__input--error {
  border-color: #D9534F !important;
}

.profile-form__error {
  margin: 5px 0 0;

  font-size: 12px;
  color: #D9534F;
}

.phone-input--error {
  border-color: #D9534F;
}
</style>