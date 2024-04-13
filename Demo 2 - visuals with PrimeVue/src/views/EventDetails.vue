<script setup>
import { onMounted, ref, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useRoute } from 'vue-router';
import Button from 'primevue/button';
import { getEventById } from '../dataProviders/events';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();
const object = ref({});
const route = useRoute();
const isLoading = ref(false);
const numberOfTickets = ref(0);

onMounted(() => {
  watch(
    () => route.params,
    async () => {
      if (route.name === 'event-details') {
        object.value = await getEventById(route.params.id);
        const eventHasTickets = cartStore.getEvents.find(obj => obj.object.id === object.value.id);
        if (eventHasTickets) {
          numberOfTickets.value = eventHasTickets.numberOfTickets;
        }
      }
    },

    { immediate: true },
  );
});

function visualiseDataImage(imageStr) {
  return `data:image/*;base64,${imageStr}`;
}
async function getTicket(id, ticketsleft) {
  isLoading.value = true;
  await cartStore.addToCart(id, numberOfTickets.value, ticketsleft);
  isLoading.value = false;
}
</script>

<template>
  <div class="container">
    <main role="main" class="pb-3">
      <div class="container">
        <div class="card">
          <div class="concert-image-container">
            <img :src="object.banerUrl" alt="Concert Image" class="concert-image">
            <div class="ticket-price">
              {{ object.ticketPrice }} BGN
            </div>
            <div class="sticker">
              {{ object.startTime }}
            </div>
            <div class="concert-info">
              <h1>{{ object.name }}</h1>
              <p>{{ object.description }}</p>
              <p>Duration: {{ object.duration }} minutes</p>
            </div>
          </div>
          <div class="info">
            <h2>Organizer Information</h2>
            <p>{{ object.companyName }}</p>
            <p>{{ object.companyAddress }}</p>
            <p>{{ object.companyPhone }}</p>
            <p>{{ object.companyEmail }}</p>
            <h2>Hall Information</h2>
            <p>{{ object.hallName }} Capacity is {{ object.hallCapacity }}</p>
            <p>Tickets Left: {{ object.ticketsLeft }}</p>
            <div style="display: flex; justify-content: space-evenly;">
              <router-link :to=" { name: 'events-list' }">
                <Button label="Back to Events" />
              </router-link>
              <InputNumber
                v-model="numberOfTickets"
                :min="0"
                :max="object.ticketsLeft"
                input-id="horizontal-buttons"
                show-buttons
                button-layout="horizontal"
                :step="1"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
              <Button label="Get a ticket" :disabled="isLoading" @click="getTicket(object.id, object.ticketsLeft)" />
            </div>
          </div>
        </div>

        <div v-for="band in object.bands" :key="band.id" class="card">
          <div class="band-card">
            <h3> {{ band.name }}</h3>
            <img style="width:auto; max-height:300px; object-fit:cover;" :src="visualiseDataImage(band.imageFile?.content)" alt="Band image">
            <p>{{ band.description }}</p>
            <a :href="band.websiteUrl" target="_blank">Official Website</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
    max-width: 1000px;
    margin: 20px auto;
}

.card {
    background-color: var(--highlight-bg);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 20px;
    display: flex;
}

.concert-image-container {
    flex: 1;
    position: relative;
}

.concert-image {
    width: 100%;
    height: auto;
}

.concert-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    text-align: center;
    background-color: rgba(2, 53, 38, 0.7);
}

    .concert-info h1 {
        margin: 0;
        font-size: 36px;
        color: rgba(240, 253, 250, 0.7);
    }

    .concert-info p {
        margin: 5px 0;
        color: rgba(240, 253, 250, 0.7);
    }

.sticker {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 20px;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
}

.ticket-price {
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
}

.info {
    flex: 1;
    padding: 20px;
    text-align: center;
}

    .info h2 {
        margin-top: 0;
        font-size: 24px;
        color: var(--primary-color);
    }

    .info p {
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--highlight-text-color);
    }

.band-card {
    flex: 1;
    background-color: var(--highlight-bg);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
}

    .band-card h3 {
        margin-top: 0;
        font-size: 20px;
        color: var(--primary-color);
    }

    .band-card p {
        margin-bottom: 10px;
        font-size: 16px;
        color: var(--highlight-text-color);
    }

    .band-card a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: bold;
    }

        .band-card a:hover {
            text-decoration: underline;
        }

    .band-card img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 10px;
    }

@media (max-width: 800px) {
    .card {
        flex-direction: column;
    }

    .concert-image-container {
        height: 300px;
    }

    .concert-info {
        position: relative;
    }

    .info {
        padding: 20px 0;
    }

    .band-card {
        margin-top: 20px;
    }
}
</style>
