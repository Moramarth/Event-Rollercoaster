<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { allEvents } from '../../../mockDataEvents';

const object = ref({});
const route = useRoute();

onMounted(() => {
  watch(
    () => route.params,
    () => {
      if (route.name === 'event-details') {
        object.value = allEvents.find(obj => obj.id = Number(route.params.id));
      }
    },

    { immediate: true },
  );
});

function addToCart() {
  // ToDO
}
</script>

<template>
  Event Details Page
  <el-card>
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
      <el-button type="primary" round @click="addToCart">
        Get a ticket
      </el-button>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>

</style>
