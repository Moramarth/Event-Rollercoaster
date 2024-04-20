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
          <div class="image-container">
            <img class="table-img" :src="slotProps.data.banerUrl" alt="banner">
          </div>
        </template>
        <template #title>
          <h3 style="text-align: center; color: var(--primary-color);">
            {{ slotProps.data.name }} - {{ slotProps.data.startTime }}
          </h3>
        </template>
        <template #subtitle>
          <p style="text-align: center;">
            {{ slotProps.data.ticketPrice }} {{ CURRENCY }}
          </p>
          <p style="text-align: center;">
            {{ slotProps.data.companyName }}
          </p>
        </template>
        <template #content>
          <p style="text-align: center;">
            {{ slotProps.data.description }}
          </p>
          <p style="text-align: center;">
            <router-link :to=" { name: 'event-details', params: { id: slotProps.data.id } }">
              <Button label="Details" />
            </router-link>
          </p>
        </template>
        <template #footer />
      </Card>
    </template>
  </Carousel>
</template>

<style scoped>
.image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.table-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
