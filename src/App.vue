<script setup lang="ts">
import { ref } from 'vue';
import AppButton from './components/atoms/AppButton.vue'
import AppIcon from './components/atoms/AppIcon.vue';
import AppIconButton from './components/atoms/AppIconButton.vue';
import AppInput from './components/atoms/AppInput.vue';

const email = ref('')
</script>

<template>
  <main class="playground">
    <h1>Component Playground</h1>

    <section>
      <h2>Buttons</h2>

      <AppButton>Primary</AppButton>

      <AppButton variant="secondary">
        Secondary
      </AppButton>

      <AppButton variant="danger">
        Delete
      </AppButton>

      <AppIcon name="delete" />
      <AppIconButton icon="search" />

     <AppInput
        v-model="email"
        type="email"
        placeholder="Enter your email"
      />

      <p>Current value: {{ email }}</p>
    </section>
  </main>
</template>

<style>
.playground {
  padding: 24px;
}

.playground section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>