<script setup>

</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'home-page' }">
            Home
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'halls-list' }">
            Halls
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'events-list' }">
            Events
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cart-page' }">
            Cart
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'tickets-page' }">
            My tickets
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style  scoped>

</style>
