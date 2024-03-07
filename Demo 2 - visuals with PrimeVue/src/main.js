import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { router } from './router/router';
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primeicons/primeicons.css';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue);
app.use(pinia);
app.use(router);

app.mount('#app');
