<script setup>
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import { ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { allEvents } from '../../../mockDataEvents';

const array = ref(structuredClone(allEvents));
const layout = ref('grid');
</script>

<template>
  This is the Events List page
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Event Date</th>
            <th>Description</th>
            <th>Featured</th>
            <th>Ticket Price</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="obj in slotProps.items" :key="obj.eventId">
            <td>{{ obj.eventId }}</td>
            <td>{{ obj.name }}</td>
            <td>{{ obj.date }}</td>
            <td>{{ obj.description }}</td>
            <td>
              {{ obj.featured?.join(', ') }}
            </td>
            <td>{{ obj.ticketPrice }}</td>
            <td>
              <router-link :to=" { name: 'event-details', params: { id: obj.eventId } }">
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
          v-for="obj in slotProps.items"
          :key="obj.eventId"
          class="card"
        >
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
  </DataView>
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
