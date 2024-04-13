<script setup>
const tickets = JSON.parse(localStorage.getItem('payed_orders'));
</script>

<template>
  My tickets page
  {{ tickets }}
  <button>
    Remove Tickets
  </button>
</template>

<style  scoped>
.p-card {
max-width: 75%;
margin: 0.5rem auto;
background-color: var(--highlight-bg)
}
</style>
