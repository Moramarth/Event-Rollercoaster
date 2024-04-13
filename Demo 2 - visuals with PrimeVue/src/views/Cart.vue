<script setup>
import { computed, ref } from 'vue';
import DataView from 'primevue/dataview';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cartStore';
import { bookTickets } from '../dataProviders/bookings';
import { CURRENCY } from '../utils/constants';

const router = useRouter();
const cartStore = useCartStore();
const layout = ref('list');

const selectedEvents = computed(() => {
  return cartStore.getEvents;
});
const totalSum = computed(() => {
  let sum = 0;
  selectedEvents.value.forEach((object) => {
    sum += (object.object.ticketPrice ?? 0) * object.numberOfTickets;
  });
  return sum;
});

async function buyTickets() {
  const booking = selectedEvents.value.reduce((acc, curr) => {
    acc.tickets.push({ concertId: curr.object.id, ticketsCount: curr.numberOfTickets });
    return acc;
  }, { tickets: [] });
  console.log(booking);
  const response = await bookTickets(booking);
  if (!response) {
    console.log('error');
    return;
  }
  console.log(response);
  cartStore.saveBookings(response);
  cartStore.clearCart();
  router.push({ name: 'orders-page' });
}
</script>

<template>
  <h1>This is the Cart Page</h1>
  <DataView
    :value="selectedEvents"
    paginator
    paginator-position="both"
    :rows="5"
    :rows-per-page-options="[5, 10, 20]"
    :layout="layout"
  >
    <template #list="slotProps">
      <table style="width:100%">
        <thead>
          <tr>
            <th>
              Event
            </th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="object in slotProps.items" :key="object.object.eventId">
            <td style="text-align: center;">
              <img class="table-img" :src="object.object.banerUrl" alt="event poster">
            </td>
            <td>
              <p style="font-size: 1.25rem;">
                {{ object.object.name }}
              </p>
              <p style="font-size: 0.75rem;">
                Ticket price: {{ object.object.ticketPrice }} {{ CURRENCY }}
              </p>
            </td>
            <td>
              <!-- TODO: Dynamic max -->
              <InputNumber
                v-model="object.numberOfTickets"
                :min="0"
                :max="600"
                input-id="horizontal-buttons"
                show-buttons
                button-layout="horizontal"
                :step="1"
                @input="cartStore.changeQuantity(object.object.id, $event)"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </td><td class="price">
              {{ object.object.ticketPrice * object.numberOfTickets }} {{ CURRENCY }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              Total:
            </td>
            <td class="price">
              {{ totalSum }} {{ CURRENCY }}
            </td>
          </tr>
        </tfoot>
      </table>
    </template>
  </DataView>
  <div class="btn-container">
    <Button @click="buyTickets">
      Buy Tickets
    </Button>
    <Button class="secondary" @click="cartStore.clearCart()">
      Clear Cart
    </Button>
  </div>
</template>

<style scoped>
.btn-container {
  display: flex;
  gap: 1rem
}
.table-img {
 max-width: 100px;
 aspect-ratio: 1/1;
 border-radius: 50%;
}
</style>
