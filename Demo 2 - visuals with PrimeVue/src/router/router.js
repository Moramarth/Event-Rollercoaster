import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Home from '../views/Home.vue';
import EventsList from '../views/EventsList.vue';
import EventDetails from '../views/EventDetails.vue';
import Cart from '../views/Cart.vue';
import Orders from '../views/Orders.vue';
import Tickets from '../views/Tickets.vue';
import Login from '../views/Login.vue';
import { validateUser } from '../utils/authValidation';

const routes = [
  { path: '/', name: 'home-page', component: Home, beforeEnter: validateUser },
  { path: '/login', name: 'login-page', component: Login },
  { path: '/events', name: 'events-list', component: EventsList, beforeEnter: validateUser },
  { path: '/events/:id', name: 'event-details', component: EventDetails, beforeEnter: validateUser },
  { path: '/cart', name: 'cart-page', component: Cart, beforeEnter: validateUser },
  { path: '/orders', name: 'orders-page', component: Orders, beforeEnter: validateUser },
  { path: '/tickets', name: 'tickets-page', component: Tickets, beforeEnter: validateUser },
  { path: '/:pathMatch(.*)*', name: 'page-not-found', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
