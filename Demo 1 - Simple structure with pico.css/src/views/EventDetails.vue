<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { allEvents } from '../../../mockDataEvents';

const object = ref({});
const route = useRoute();

onMounted(() => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'event-details') {
        object.value = allEvents.find(obj => obj.id = Number(route.params.id));
      }
    },

    { immediate: true },
  );
});

function addToCart() {
  // ToDO
}
</script>

<template>
  Event Details Page
  <p>
    <button @click="addToCart">
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
    <router-link role="button" :to=" { name: 'event-details', params: { id: object.eventId } }">
      Go to Details
    </router-link>
  </p>
</template>

<style lang="scss" scoped>

</style>
