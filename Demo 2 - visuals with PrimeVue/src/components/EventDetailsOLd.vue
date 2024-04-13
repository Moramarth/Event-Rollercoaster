<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { getEventById } from '../dataProviders/events';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();
const object = ref({});
const route = useRoute();

onMounted(() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'event-details') {
        object.value = await getEventById(route.params.id);
      }
    },

    { immediate: true },
  );
});
</script>

<template>
  Event Details Page
  <div style="display: flex">
    <Card>
      <template #header>
        <img alt="obj image" :src="object.banerUrl">
      </template>
      <template #title>
        {{ object.name }}
      </template>
      <template #subtitle>
        <p>Starting at {{ object.startTime }} for exciting {{ object.duration }} minutes!</p>
        <p>Ticket Price: {{ object.ticketPrice }} BGN</p>
      </template>
      <template #content>
        <p>{{ object.description }}</p>
        <p>{{ object.featured?.join(', ') }}</p>
      </template>
      <template #footer>
        <router-link :to=" { name: 'events-list' }">
          <Button label="Back to Events" />
        </router-link>
        <Button label="Get a ticket" @click="cartStore.addToCart(object.eventId)" />
      </template>
    </Card>
    <Card>
      <template #header>
        <p>Contacts</p>
        <p> {{ object.companyName }}</p>
        <p> {{ object.companyAddress }}</p>
        <p> {{ object.companyPhone }}</p>
        <p> {{ object.companyEmail }}</p>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>
