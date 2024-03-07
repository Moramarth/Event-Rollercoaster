<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
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
  <Card class="card">
    <template #header>
      <img alt="hall image" src="">
    </template>
    <template #title>
      {{ hall.name }}
    </template>
    <template #subtitle>
      {{ hall.seatCapacity }}
    </template>
    <template #content>
      {{ hall.description }}
    </template>
    <template #footer>
      <router-link :to=" { name: 'hall-details', params: { id: hall.id } }">
        <Button label="Go to Details" />
      </router-link>
    </template>
  </Card>
  <div class="my-grid">
    <Card v-for="obj in events" :key="obj.eventId">
      <template #header>
        <img alt="obj image" src="">
      </template>
      <template #title>
        {{ obj.name }}
      </template>
      <template #subtitle>
        {{ obj.date }}
      </template>
      <template #content>
        <p>{{ obj.description }}</p>
        <p>{{ obj.featured?.join(', ') }}</p>
      </template>
      <template #footer>
        <router-link :to=" { name: 'event-details', params: { id: obj.eventId } }">
          <Button label="Go to Details" />
        </router-link>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.my-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(var(--my-grid-cols), 1fr);
  gap: 3rem;
}

.card {
  overflow: hidden;
}
@media screen and (min-width: 560px) {
  .my-grid {
    --my-grid-cols: 2;
  }
}

@media screen and (min-width: 768px) {
  .my-grid {
    --my-grid-cols: 4;
  }
}

@media screen and (min-width: 1024px) {
  .my-grid {
    --my-grid-cols: 5;
  }
}
</style>
