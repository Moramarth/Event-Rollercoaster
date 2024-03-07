<script setup>
import Dock from 'primevue/dock';

const items = [
  { label: 'Home', route: { name: 'home-page' }, icon: 'pi pi-home' },
  { label: 'Halls', route: { name: 'halls-list' }, icon: 'pi pi-building' },
  { label: 'Events', route: { name: 'events-list' }, icon: 'pi pi-calendar' },
  { label: 'Cart', route: { name: 'cart-page' }, icon: 'pi pi-shopping-cart' },
  { label: 'Tickets', route: { name: 'tickets-page' }, icon: 'pi pi-ticket' },
];
</script>

<template>
  <header>
    <Dock :model="items" position="top">
      <template #icon="{ item }">
        <router-link :to="item.route">
          <i :class="item.icon" />
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
