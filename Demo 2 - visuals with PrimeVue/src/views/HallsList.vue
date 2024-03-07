<script setup>
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { hallsArray } from '../../../mockDataHalls';

const array = ref(structuredClone(hallsArray));
const layout = ref('list');
</script>

<template>
  This is the Halls List page
  <DataView
    :value="array"
    paginator
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Seat Capacity</th>
            <th>Description</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="hall in slotProps.items" :key="hall.id">
            <td>{{ hall.id }}</td>
            <td>{{ hall.name }}</td>
            <td>{{ hall.seatCapacity }}</td>
            <td>{{ hall.description }}</td>
            <td>
              <router-link :to=" { name: 'hall-details', params: { id: hall.id } }">
                <Button label="Go to Details" />
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #grid="slotProps">
      <div class="my-grid">
        <Card
          v-for="hall in slotProps.items"
          :key="hall.id"
          class="card"
        >
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
      </div>
    </template>
  </DataView>
</template>

<style  scoped>
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
