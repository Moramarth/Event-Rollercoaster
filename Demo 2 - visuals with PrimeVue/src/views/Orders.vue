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
  <h1>This is the orders page</h1>
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
          <h3>Organiser: {{ concert.companyName }} -  {{ concert.hallName }}</h3>
          <p>Starts at {{ concert.startDate }}</p>
          <p>Number of tickets {{ concert.ticketsCount }}</p>
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
  background-color: var(--highlight-bg)
}
.image-container {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  object-fit:fill;
}
.image-container > img {
  width: 220px;
  object-fit:contain;
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
