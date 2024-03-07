<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { hallsArray } from '../../../mockDataHalls';
import { allEvents } from '../../../mockDataEvents';

const hall = ref({});
const route = useRoute();
const events = ref([]);

onMounted(() => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'hall-details') {
        hall.value = hallsArray.find(obj => obj.id === Number(route.params.id));
        events.value = allEvents.filter(obj => obj.hallId === hall.value.id);
      }
    },

    { immediate: true },
  );
});
</script>

<template>
  This is the Halls Details page
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ hall.name }}</span>
      </div>
    </template>
    <p class="text item">
      {{ hall.id }}
    </p>
    <p class="text item">
      {{ hall.seatCapacity }}
    </p>
    <p class="text item">
      {{ hall.description }}
    </p>
  </el-card>
  <el-space wrap>
    <el-card v-for="object in events" :key="object.eventId">
      <template #header>
        <div class="card-header">
          <span>{{ object.name }}</span>
        </div>
      </template>
      <p class="text item">
        {{ object.eventId }}
      </p>
      <p class="text item">
        {{ object.name }}
      </p>
      <p class="text item">
        {{ object.date }}
      </p>
      <p class="text item">
        {{ object.description }}
      </p>
      <p class="text item">
        {{ object.featured?.join(', ') }}
      </p>
      <p class="text item">
        {{ object.ticketPrice }}
      </p>
      <template #footer>
        <router-link :to=" { name: 'event-details', params: { id: object.eventId } }">
          <el-button type="primary" round>
            Go to Details
          </el-button>
        </router-link>
      </template>
    </el-card>
  </el-space>
</template>

<style lang="scss" scoped>

</style>
