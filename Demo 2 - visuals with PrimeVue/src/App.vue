<script setup>
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppHeader />
  <main><RouterView /></main>
  <AppFooter />
</template>

<style scoped>
main {
  margin: 10rem auto 2rem auto;
  max-width: 80em;
}
</style>
