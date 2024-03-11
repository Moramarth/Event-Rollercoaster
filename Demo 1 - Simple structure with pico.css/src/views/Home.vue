<script setup>

</script>

<template>
  <article class="hero-section">
    <div>
      <h1>Embark on a journey of joy and celebration! Find the most delightful events with Event Rollercoaster.</h1>
      <router-link role="button" :to="{ name: 'halls-list' }">
        Discover the Magic
      </router-link>
    </div>
    <img
      src="https://blocks.primevue.org/images/blocks/hero/hero-1.png"
      alt="Image"
    >
  </article>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}
.hero-section {
  display: flex;
}
img {
  clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)
}
</style>
