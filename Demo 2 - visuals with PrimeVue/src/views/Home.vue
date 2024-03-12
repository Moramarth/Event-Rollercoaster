<script setup>
import Button from 'primevue/button';
</script>

<template>
  <div class="hero-section">
    <div>
      <h1>Embark on a journey of joy and celebration! Find the most delightful events with Event Rollercoaster.</h1>
      <router-link :to="{ name: 'halls-list' }">
        <Button label="Discover the Magic" icon="pi pi-send" />
      </router-link>
    </div>
    <img
      src="https://blocks.primevue.org/images/blocks/hero/hero-1.png"
      alt="Image"
    >
  </div>
</template>

<style scoped>
.hero-section {
  display: flex;
}
img {
  clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)
}
</style>
