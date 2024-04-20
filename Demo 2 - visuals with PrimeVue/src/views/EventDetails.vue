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

  const response = await bookTickets(booking);
  if (!response) {
    console.log('error');
    return;
  }

  cartStore.clearCart();
  router.push({ name: 'orders-page' });
}
</script>

<template>
  <h1 style="text-align: center; color: var(--primary-color);">
    My Cart Page
  </h1>
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
        <tbody>
          <tr v-for="object in slotProps.items" :key="object.object.eventId">
            <td style="padding: 15px;">
              <img class="table-img" :src="object.object.banerUrl" alt="event poster">
            </td>
            <td>
              <p style="font-size: 1.5rem;">
                {{ object.object.name }}
              </p>
              <p style="font-size: 0.8rem;">
                Price: {{ object.object.ticketPrice }} {{ CURRENCY }}
              </p>
            </td>
            <td style="text-align: center;">
              <InputNumber
                v-model="object.numberOfTickets"
                style="height:60px;"
                :min="0"
                :max="600"
                input-id="horizontal-buttons"
                show-buttons
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
            <td style="text-align: end; padding-right: 20px; font-size: larger;" colspan="3">
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
      Make order
    </Button>
    <Button class="secondary" @click="cartStore.clearCart()">
      Clear Cart
    </Button>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  padding: 0 2rem;
}

.btn-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
}

.table-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.price {
  text-align: end;
}
</style>
