<script setup>
import { onMounted, ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Card from 'primevue/card';
import { CURRENCY } from '../utils/constants';
import { generateTicket } from '../utils/generateTicket';
import { getMyPayments } from '../dataProviders/bookings';

const payments = ref({});

onMounted(async () => {
  payments.value = await getMyPayments();
  const color = {
    light: getComputedStyle(document.documentElement).getPropertyValue('--primary-50'),
    dark: getComputedStyle(document.documentElement).getPropertyValue('--primary-900'),
  };

  payments.value.tickets.forEach((element) => {
    element.tickets.forEach(async (ticket) => {
      const qrcode = await generateTicket(ticket.ticketId, color);
      ticket.QRCode = qrcode
      ;
    });
  });
});
function buildOrderHeader(id) {
  return `Order Number ${id}`;
}
</script>

<template>
  <h1>This is the tickets page</h1>
  <Accordion :multiple="true" :active-index="0">
    <AccordionTab v-for="tab in payments.tickets" :key="tab" :header="buildOrderHeader(tab.orderId)">
      <Card v-for="ticket in tab.tickets" :key="ticket.ticketId">
        <template #header>
          <div class="image-container">
            <img :src="ticket.concertImageUrl" alt="banner">
            <img v-if="ticket.QRCode" :src="ticket.QRCode" alt="QRCODE">
          </div>
        </template>
        <template #title />
        <template #subtitle />
        <template #content>
          <h2>{{ ticket.concertName }}</h2>
          <h3>Organiser: {{ ticket.companyName }} - {{ ticket.hallName }}</h3>
          <p>{{ ticket.startDate }}</p>
          <p>{{ ticket.ticketPrice }} {{ CURRENCY }}</p>
        </template>
      </Card>
    </AccordionTab>
  </Accordion>
</template>

<style  scoped>
.image-container {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  object-fit:fill;
}
.image-container > img {
  width: 150px;
  object-fit:contain;
}
.p-card {
  display: flex;
  padding-left: 3rem;
  gap: 3rem;
  align-items: center;
  max-width: 75%;
  margin: 0.5rem auto;
  background-color: var(--highlight-bg)
}
</style>
