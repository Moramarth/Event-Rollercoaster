import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { allEvents } from '../../../mockDataEvents';

export const useCartStore = defineStore('cart', () => {
  const events = ref([]);

  const getEvents = computed(() => events.value);

  function addToCart(selectedId) {
    const eventInCart = events.value.find(object => object.object.eventId === selectedId);
    if (!eventInCart) {
      const newEvent = allEvents.find(object => object.eventId === selectedId);
      events.value.push({
        object: structuredClone(newEvent),
        numberOfTickets: 1,
      });
    }
    else {
      eventInCart.numberOfTickets += 1;
    }
  }

  function changeQuantity(objectId, event) {
    const qty = Number(event.target.value) ?? 0;
    const productInCart = events.value.find(object => object.object.eventId === objectId);
    if (!productInCart)
      return;

    if (qty > 0) {
      productInCart.numberOfTickets = qty;
    }
    else {
      events.value = events.value.filter(object => object.object.eventId !== objectId);
    }
  }
  function clearCart() {
    events.value = [];
  }
  return {
    events,
    getEvents,
    addToCart,
    changeQuantity,
    clearCart,
  };
});