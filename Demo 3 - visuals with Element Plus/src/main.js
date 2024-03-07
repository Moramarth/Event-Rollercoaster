import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import { router } from './router/router';
import App from './App.vue';
import 'element-plus/dist/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount('#app');
