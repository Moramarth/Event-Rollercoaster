<script setup>

</script>

<template>
  <div class="hero-section">
    <div>
      <h1>Embark on a journey of joy and celebration! Find the most delightful events with Event Rollercoaster.</h1>
      <router-link :to="{ name: 'halls-list' }">
        <el-button type="primary">
          Discover the Magic
        </el-button>
      </router-link>
    </div>
    <img
      src="https://blocks.primevue.org/images/blocks/hero/hero-1.png"
      alt="Image"
    >
  </div>
</template>

<style scoped>
h1 {
  font-size: 5rem;
}
.hero-section {
  display: flex;
}
img {
  clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)
}
.el-button {
  font-size: 2em;
  padding: 2em
}
</style>
