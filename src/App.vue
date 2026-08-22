<script setup lang="ts">
import AppButton from './components/atoms/AppButton.vue'
import AppIcon from './components/atoms/AppIcon.vue';
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