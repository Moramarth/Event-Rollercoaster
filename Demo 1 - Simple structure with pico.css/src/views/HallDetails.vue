<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { hallsArray } from '../../../mockDataHalls';
import { allEvents } from '../../../mockDataEvents';

const hall = ref({});
const route = useRoute();
const events = ref([]);

onMounted(() => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'hall-details') {
        hall.value = hallsArray.find(obj => obj.id = Number(route.params.id));
        events.value = allEvents.filter(obj => obj.hallId === hall.value.id);
      }
    },

    { immediate: true },
  );
});
</script>

<template>
  This is the Halls Details page
  <article>
    <p>{{ hall.id }}</p>
    <p>{{ hall.name }}</p>
    <p>{{ hall.seatCapacity }}</p>
    <p>{{ hall.description }}</p>
  </article>

  <article v-for="obj in events" :key="obj.eventId">
    <p>{{ obj.eventId }}</p>
    <p>{{ obj.name }}</p>
    <p>{{ obj.date }}</p>
    <p>{{ obj.description }}</p>
    <p>
      {{ obj.featured?.join(', ') }}
    </p>
    <p>{{ obj.ticketPrice }}</p>
    <p>
      <router-link role="button" :to=" { name: 'event-details', params: { id: obj.eventId } }">
        Go to Details
      </router-link>
    </p>
  </article>
</template>

<style lang="scss" scoped>

</style>
