<script setup>
import { computed } from 'vue';
import { useTicketStore } from '../store/ticketStore';

// TODO: more testing
const ticketStore = useTicketStore();
const tickets = computed(() => ticketStore.getAllTickets);
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
