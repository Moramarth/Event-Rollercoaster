<script setup>
import { ref } from 'vue';
import { allEvents } from '../../../mockDataEvents';

const array = ref(structuredClone(allEvents));
</script>

<template>
  This is the Events List page
  <el-table :data="array">
    <el-table-column prop="eventId" label="ID" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="date" label="Event Date" />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="featured" label="Featured" />
    <el-table-column prop="ticketPrice" label="Ticket Price" />
    <el-table-column prop="id" label="Details">
      <template #default="scope">
        <router-link :to=" { name: 'event-details', params: { id: scope.row.eventId } }">
          <el-button type="primary" round>
            Go to Details
          </el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<style lang="scss" scoped>

</style>
