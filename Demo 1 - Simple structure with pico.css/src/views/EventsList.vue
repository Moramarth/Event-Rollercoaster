<script setup>
import { ref } from 'vue';
import { allEvents } from '../../../mockDataEvents';

const array = ref(structuredClone(allEvents));
</script>

<template>
  This is the Events List page
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Event Date</th>
        <th>Description</th>
        <th>Ticket Price</th>
        <th>Details</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="obj in array" :key="obj.eventId">
        <td>{{ obj.eventId }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.date }}</td>
        <td>{{ obj.description }}</td>
        <td>
          {{ obj.featured?.join(', ') }}
        </td>
        <td>{{ obj.ticketPrice }}</td>
        <td>
          <router-link role="button" :to=" { name: 'event-details', params: { id: obj.eventId } }">
            Go to Details
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>

</style>
