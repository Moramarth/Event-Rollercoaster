import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { mockDataEvents } from '../../../mockDataEvents';

export const useCartStore = defineStore('cart', () => {
  const events = ref([]);

  const getEvent = computed(() => eventId => events.value.find(obj => obj.id === eventId));

  function addToCart(selectedId) {
    const eventInCart = events.value.find(object => object.id === selectedId);
    if (!eventInCart) {
        newEvent = mockDataEvents.find(object => object.id === selectedId)
        events.value.push(newEvent);
    }
    else {
      eventInCart.quantity += 1;
    }
  };

  function clearCart() {
    events.value = ref([])
  }
  return {
    events,
    getEvent,
    addToCart,
    clearCart
}
})