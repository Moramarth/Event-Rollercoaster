<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();
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
</script>

<template>
  <h1>This is the Cart Page</h1>
  <article>
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="object in selectedEvents" :key="object.object.eventId">
          <td>
            <div class="img-wrapper">
              <img :src="object.object.image" alt="event poster">
            </div>
          </td>
          <td>
            <p style="font-size: 1.25rem;">
              {{ object.object.name }}
            </p>
            <p style="font-size: 0.75rem;">
              Ticket price: {{ object.object.ticketPrice }}$
            </p>
          </td>
          <td>
            <input
              type="number"
              :value="object.numberOfTickets"
              style="width: 5rem;"
              @input="cartStore.changeQuantity(object.object.eventId, $event)"
            >
          </td>
          <td class="price">
            {{ object.object.ticketPrice * object.numberOfTickets }}$
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            Total:
          </td>
          <td class="price">
            {{ totalSum }}$
          </td>
        </tr>
      </tfoot>
    </table>
    <button @click="cartStore.clearCart()">
      Clear Cart
    </button>
  </article>
</template>

<style lang="scss" scoped>

</style>
