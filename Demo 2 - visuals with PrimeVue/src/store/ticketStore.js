import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// TODO: More testing
export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref([]);

  const getAllTickets = computed(() => tickets.value);

  function storePayedTickets(orderData) {
    tickets.value.push(orderData);
    localStorage.setItem('tickets', JSON.stringify(tickets.value));
  }

  function getStoredTickets() {
    const storedTickets = JSON.parse(localStorage.getItem('tickets'));
    if (!storedTickets)
      return;
    tickets.value = storedTickets;
  }

  return {
    getAllTickets,
    getStoredTickets,
    storePayedTickets,
  };
});
