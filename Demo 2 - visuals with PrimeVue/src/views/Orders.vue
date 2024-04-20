<script setup>
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { useRouter } from 'vue-router';
import { getMyBookings, payTickets } from '../dataProviders/bookings';

import { CURRENCY } from '../utils/constants';

const router = useRouter();

const activeBookings = ref({});

onMounted(async () => {
  activeBookings.value = await getMyBookings();
});

function buildBookingHeader(id) {
  return `Order Number ${id}`;
}

async function payOrders(orderId) {
  const response = await payTickets(orderId);
  if (Object.keys(response).length > 0) {
    router.push({ name: 'tickets-page' });
  }
}
</script>

<template>
  <h1 style="text-align: center; color: var(--primary-color);">
    PAYMENT PAGE
  </h1>
  <Accordion :multiple="true" :active-index="0">
    <AccordionTab v-for="tab in activeBookings.bookings" :key="tab.bookingId" :header="buildBookingHeader(tab.bookingId)">
      <Button label="Pay Tickets" @click="payOrders(tab.bookingId)" />
      <Card v-for="concert in tab.orders" :key="concert.concertName">
        <template #header>
          <div class="image-container">
            <img :src="concert.concertImageUrl" alt="">
          </div>
        </template>
        <template #title />
        <template #subtitle />
        <template #content>
          <h2>{{ concert.concertName }}</h2>
          <h4>Organiser: {{ concert.companyName }} - {{ concert.hallName }}</h4>
          <p>{{ concert.startDate }}</p>
          <p>Number of tickets: {{ concert.ticketsCount }}</p>
          <p>Ticket Price: {{ concert.ticketPrice }} {{ CURRENCY }}</p>
        </template>
        <template #footer />
      </Card>
    </AccordionTab>
  </Accordion>
</template>

<style  scoped>
.p-card {
  display: flex;
  padding-left: 3rem;
  gap: 3rem;
  align-items: center;
  max-width: 75%;
  margin: 0.5rem auto;
  background-color: var(--highlight-bg);
}
.image-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 50%;
  padding: 1rem;
}
.image-container > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  padding-bottom: 1rem;
}

h4 {
  font-size: 1rem;
  color: var(--primary-color);
  padding-bottom: 0.5rem;
  font-style: italic;
}

@media (max-width:800px) {
  .p-card {
    flex-direction: column;
    padding: 0;
  }
  .image-container > img {
  width: 100%;
  object-fit:contain;
}
}
</style>
