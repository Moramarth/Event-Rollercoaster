<script setup>
import { ref } from 'vue';
import { hallsArray } from '../../../mockDataHalls';

const array = ref(structuredClone(hallsArray));
</script>

<template>
  This is the Halls List page
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
      <tr v-for="hall in array" :key="hall.id">
        <td>{{ hall.id }}</td>
        <td>{{ hall.name }}</td>
        <td>{{ hall.seatCapacity }}</td>
        <td>{{ hall.description }}</td>
        <td>
          <router-link role="button" :to="{ name: 'hall-details', params: { id: hall.id } }">
            Go to Details
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>

</style>
