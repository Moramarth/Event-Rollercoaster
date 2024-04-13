<script setup>
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { getEvents } from '../dataProviders/events';

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
    :rows="5"
    :rows-per-page-options="[5, 10, 20]"
    :layout="layout"
  >
    <template #header>
      <div style="width: 100%">
        <DataViewLayoutOptions v-model="layout" />
      </div>
    </template>
    <template #list="slotProps">
      <table style="width: 100%;">
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
            <td style="text-align: center;">
              {{ obj.name }}
            </td>
            <td style="text-align: center;">
              {{ obj.startTime }}
            </td>
            <td>{{ obj.description }}</td>
            <td style="text-align: center;">
              {{ obj.ticketPrice }} BGN
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
            <p>{{ obj.ticketPrice }} BGN</p>
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
  background-color: var(--highlight-bg);
}
.my-grid {
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(var(--my-grid-cols), 1fr);
  gap: 3rem;
}

.card {
  overflow: hidden;
}

.card img {
  width:100%
}

.table-img {
 max-width: 75px;
 aspect-ratio: 1/1;
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
