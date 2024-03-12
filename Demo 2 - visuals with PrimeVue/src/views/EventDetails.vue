<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
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
        object.value = allEvents.find(obj => obj.id = Number(route.params.id));
      }
    },

    { immediate: true },
  );
});
</script>

<template>
  Event Details Page
  <Card>
    <template #header>
      <img alt="obj image" src="">
    </template>
    <template #title>
      {{ object.name }}
    </template>
    <template #subtitle>
      {{ object.date }}
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
</template>

<style lang="scss" scoped>

</style>
