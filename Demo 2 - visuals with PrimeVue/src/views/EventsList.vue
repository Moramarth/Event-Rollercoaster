<script setup>
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { getEvents } from '../dataProviders/events';
import { CURRENCY } from '../utils/constants';

const array = ref([]);
const layout = ref('grid');

onMounted(async () => {
  array.value = await getEvents();
});
</script>

<template>
  <DataView
    :value="array"
    paginator
    paginator-position="both"
    :rows="3"
    :rows-per-page-options="[3, 6, 12]"
    :layout="layout"
  >
    <template #header>
      <div style="width: 100%">
        <DataViewLayoutOptions v-model="layout" />
      </div>
    </template>
    <template #list="slotProps">
      <table style="width: 100%; padding: 1rem;">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Event Date</th>
            <th style="width: 50%;">
              Description
            </th>
            <th>Ticket Price</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="obj in slotProps.items" :key="obj.id">
            <td style="text-align: center;">
              <img class="table-img" :src="obj.banerUrl" alt="banner">
            </td>
            <td style="text-align: center; color: var(--primary-color); width: 20%;">
              {{ obj.name }}
            </td>
            <td style="text-align: center; color: var(--primary-color); width: 10%;">
              {{ obj.startTime }}
            </td>
            <td>{{ obj.description }}</td>
            <td style="text-align: center; color: var(--primary-color); width: 20%;">
              {{ obj.ticketPrice }} {{ CURRENCY }}
            </td>
            <td style="text-align: center;">
              <router-link :to=" { name: 'event-details', params: { id: obj.id } }">
                <Button label="Details" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #grid="slotProps">
      <div class="my-grid">
        <Card
          v-for="obj in slotProps.items"
          :key="obj.id"
          class="card"
        >
          <template #header>
            <img alt="obj image" :src="obj.banerUrl">
          </template>
          <template #title>
            {{ obj.name }}
          </template>
          <template #subtitle>
            {{ obj.startTime }}
          </template>
          <template #content>
            <p>{{ obj.description }}</p>
            <p>{{ obj.ticketPrice }} {{ CURRENCY }}</p>
          </template>
          <template #footer>
            <router-link :to=" { name: 'event-details', params: { id: obj.id } }">
              <Button label="Details" />
            </router-link>
          </template>
        </Card>
      </div>
    </template>
  </DataView>
</template>

<style scoped>
.p-card {
  display: flex ;
  flex-direction: column;
  background-color: var(--highlight-bg);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
}

.my-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(var(--my-grid-cols), 1fr);
  gap: 3rem;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 0.5rem;
  transition: transform 0.5s;
}

.card img:hover {
  transform: scale(1.1);
}

.card img:active {
  transform: scale(1.05);
}

.table-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

@media screen and (min-width: 560px) {
  .my-grid {
    --my-grid-cols: 1;
  }
}

@media screen and (min-width: 768px) {
  .my-grid {
    --my-grid-cols: 2;
  }
}

@media screen and (min-width: 1024px) {
  .my-grid {
    --my-grid-cols: 3;
  }
}
</style>
