<script setup>
import Dock from 'primevue/dock';
import { useCartStore } from '../store/cartStore';

const cartStore = useCartStore();

const items = [
  { label: 'Home', route: { name: 'home-page' }, icon: 'pi pi-home' },
  { label: 'Events', route: { name: 'events-list' }, icon: 'pi pi-calendar' },
  { label: 'Cart', route: { name: 'cart-page' }, icon: 'pi pi-shopping-cart' },
  { label: 'Orders', route: { name: 'orders-page' }, icon: 'pi pi-wallet' },
  { label: 'Tickets', route: { name: 'tickets-page' }, icon: 'pi pi-ticket' },
];
</script>

<template>
  <header>
    <Dock :model="items" position="top">
      <template #icon="{ item }">
        <router-link :to="item.route">
          <i v-if="item.label === 'Cart' && cartStore.events.length > 0" class="pi pi-cart-plus" />
          <i v-else :class="item.icon" />
          {{ item.label }}
        </router-link>
      </template>
    </Dock>
  </header>
</template>

<style  scoped>
a {
  text-decoration: none;
  text-align: center;
  color: var(--primary-color);

}
i {
  font-size: 2.5rem;
}
</style>
