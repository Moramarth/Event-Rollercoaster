import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { router } from './router/router';
import { useUsersStore } from './store/userStore';

import 'primevue/resources/themes/lara-dark-green/theme.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import { useTicketStore } from './store/ticketStore';
import { useCartStore } from './store/cartStore';

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue);
app.use(pinia);
app.use(router);

const userStore = useUsersStore();
userStore.getPersistedAuth();

const ticketStore = useTicketStore();
ticketStore.getStoredTickets();

const cartStore = useCartStore();
cartStore.getSavedBookings();

app.mount('#app');
