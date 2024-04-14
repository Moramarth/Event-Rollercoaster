import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getEventById } from '../dataProviders/events';

export const useCartStore = defineStore('cart', () => {
  const events = ref([]);
  const getEvents = computed(() => events.value);

  async function addToCart(selectedId, numberOfTickets, ticketsLeft) {
    const eventInCart = events.value.find(object => object.object.id === selectedId);
    if (!eventInCart) {
      const newEvent = await getEventById(selectedId);
      events.value.push({
        object: structuredClone(newEvent),
        numberOfTickets,
        ticketsLeft,
      });
    }
    else {
      eventInCart.numberOfTickets = numberOfTickets;
    }
  }

  function changeQuantity(objectId, event) {
    const qty = Number(event.value) ?? 0;
    const productInCart = events.value.find(object => object.object.id === objectId);
    if (!productInCart)
      return;

    if (qty > 0) {
      productInCart.numberOfTickets = qty;
    }
    else {
      events.value = events.value.filter(object => object.object.id !== objectId);
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
