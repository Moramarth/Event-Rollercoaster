<script setup>
import { computed } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { useCartStore } from '../store/cartStore';
import { payTickets } from '../dataProviders/bookings';
import { useTicketStore } from '../store/ticketStore';

const cartStore = useCartStore();
const ticketStore = useTicketStore();

const activeBookings = computed(() => cartStore.getActiveBookings);

function buildBookingHeader(id) {
  return `Order Number ${id}`;
}

async function payOrders(orderId) {
  const response = await payTickets(orderId);
  if (Object.keys(response).length > 0) {
    ticketStore.storePayedTickets(response);
  }
  // TODO: Handle errors
}
</script>

<template>
  <h1>This is the orders page</h1>
  <Accordion :multiple="true" :active-index="0">
    <AccordionTab v-for="tab in activeBookings" :key="tab.bookingId" :header="buildBookingHeader(tab.booking.bookingId)">
      <Button label="Pay Tickets" @click="payOrders(tab.booking.bookingId)" />
      <Card v-for="order in tab.booking.orders" :key="order.concertName">
        <template #content>
          <p>{{ order.concertName }}</p>
          <p>{{ order.startDate }}</p>
          <p>{{ order.companyName }}</p>
          <p>{{ order.hallName }}</p>
          <p>{{ order.ticketCount }}</p>
          <p>{{ order.ticketPrice }}</p>
        </template>
      </Card>
    </AccordionTab>
  </Accordion>
</template>

<style  scoped>
.p-card {
max-width: 75%;
margin: 0.5rem auto;
background-color: var(--highlight-bg)
}
</style>
