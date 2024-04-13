<script setup>
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Card from 'primevue/card';
import { onMounted, ref } from 'vue';
import { getUpcomingEvents } from '../dataProviders/events';
import { CURRENCY } from '../utils/constants';

const array = ref([]);

onMounted(async () => {
  array.value = await getUpcomingEvents();
});
</script>

<template>
  <Carousel
    :value="array"
    :num-visible="1"
    :num-scroll="1"
    circular
    :autoplay-interval="6000"
  >
    <template #item="slotProps">
      <Card>
        <template #header>
          <img class="table-img" :src="slotProps.data.banerUrl" alt="banner">
        </template>
        <template #title>
          {{ slotProps.data.name }}
        </template>
        <template #subtitle>
          <p>{{ slotProps.data.ticketPrice }} {{ CURRENCY }}</p>
          <p>Starts at {{ slotProps.data.startTime }}</p>
        </template>
        <template #content>
          <h2 />
          {{ slotProps.data.description }}
        </template>
        <template #footer>
          <p>{{ slotProps.data.companyName }}</p>
          <p>
            <router-link :to=" { name: 'event-details', params: { id: slotProps.data.id } }">
              <Button label="Details" />
            </router-link>
          </p>
        </template>
      </Card>
    </template>
  </Carousel>
</template>

<style scoped>
.p-card {
  display: flex;
  padding: 20px;
  height: 500px;
  font-size: 1.2rem;
}

.table-img {
 height: 100%;
 width: auto;
 border-radius: 1rem;
}
</style>
