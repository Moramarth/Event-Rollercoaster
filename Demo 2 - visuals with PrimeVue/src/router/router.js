import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Home from '../views/Home.vue';
import EventsList from '../views/EventsList.vue';
import EventDetails from '../views/EventDetails.vue';
import Cart from '../views/Cart.vue';
import Orders from '../views/Orders.vue';
import Tickets from '../views/Tickets.vue';

// TODO: Login route
const routes = [
  { path: '/', name: 'home-page', component: Home },
  { path: '/events', name: 'events-list', component: EventsList },
  { path: '/events/:id', name: 'event-details', component: EventDetails },
  { path: '/cart', name: 'cart-page', component: Cart },
  { path: '/orders', name: 'orders-page', component: Orders },
  { path: '/tickets', name: 'tickets-page', component: Tickets },
  { path: '/:pathMatch(.*)*', name: 'page-not-found', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
