<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
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
      <router-link :to=" { name: 'event-details', params: { id: object.eventId } }">
        <Button label="Go to Details" />
      </router-link>
      <Button label="Get a ticket" @click="addToCart" />
    </template>
  </Card>
</template>

<style lang="scss" scoped>

</style>
