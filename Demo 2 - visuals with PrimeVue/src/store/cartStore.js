import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getEventById } from '../dataProviders/events';

export const useCartStore = defineStore('cart', () => {
  const events = ref([]);
  const activeBookings = ref([]);

  const getEvents = computed(() => events.value);
  const getActiveBookings = computed(() => activeBookings.value);

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

  function saveBookings(bookingApprooval) {
    activeBookings.value.push(bookingApprooval);
    localStorage.setItem('savedBookings', JSON.stringify(activeBookings.value));
  }

  function getSavedBookings() {
    const bookings = JSON.parse(localStorage.getItem('savedBookings'));
    if (!bookings) {
      return;
    }
    activeBookings.value = bookings;
  }

  function removePayedBookings(bookingId) {
    activeBookings.value = activeBookings.value.filter(object => object.booking.bookingId !== bookingId);
    localStorage.setItem('savedBookings', JSON.stringify(activeBookings.value));
    getSavedBookings();
  }

  function clearCart() {
    events.value = [];
  }
  return {
    events,
    getEvents,
    getActiveBookings,
    addToCart,
    changeQuantity,
    saveBookings,
    getSavedBookings,
    removePayedBookings,
    clearCart,
  };
});
