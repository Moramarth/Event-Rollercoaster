<script setup>
import { ref } from 'vue';
import { hallsArray } from '../../../mockDataHalls';

const array = ref(structuredClone(hallsArray));
</script>

<template>
  This is the Halls List page
  <el-table :data="array">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="seatCapacity" label="Seat Capacity" />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="id" label="Details">
      <template #default="scope">
        <router-link role="button" :to=" { name: 'hall-details', params: { id: scope.row.id } }">
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
