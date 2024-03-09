<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { allEvents } from '../../../mockDataEvents';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();
const object = ref({});
const route = useRoute();

onMounted(() => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'event-details') {
        object.value = allEvents.find(obj => obj.eventId === Number(route.params.id));
      }
    },

    { immediate: true },
  );
});
</script>

<template>
  Event Details Page
  <p>
    <button @click="cartStore.addToCart(object.eventId)">
      Get a ticket
    </button>
  </p>
  <p>{{ object.eventId }}</p>
  <p>{{ object.name }}</p>
  <p>{{ object.date }}</p>
  <p>{{ object.description }}</p>
  <p>
    {{ object.featured?.join(', ') }}
  </p>
  <p>{{ object.ticketPrice }}</p>
  <p>
    <router-link role="button" :to=" { name: 'events-list' }">
      Back to Events
    </router-link>
  </p>
</template>

<style lang="scss" scoped>

</style>
