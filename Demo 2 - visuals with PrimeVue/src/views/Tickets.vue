<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tickets = ref(JSON.parse(localStorage.getItem('tickets')));

function removeTickets() {
  localStorage.removeItem('tickets');
  router.push({ name: 'home-page' });
}
</script>

<template>
  My tickets page
  <button @click="removeTickets">
    Remove Tickets
  </button>

  <article v-for="ticket in tickets" :key="ticket.id">
    <img :src="ticket.img">

    <p>{{ ticket.date }}</p>
    <p>{{ ticket.eventName }}</p>
  </article>
</template>

<style lang="scss" scoped>

</style>
