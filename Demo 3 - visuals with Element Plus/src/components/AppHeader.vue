<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <router-link :to="{ name: 'home-page' }">
      <el-menu-item index="0" router="true">
        <img
          style="width: 100px"
          src=""
          alt="Element logo"
        >
      </el-menu-item>
    </router-link>
    <div class="flex-grow" />
    <router-link :to="{ name: 'home-page' }">
      <el-menu-item index="1">
        Home
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'halls-list' }">
      <el-menu-item index="2">
        Halls
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'events-list' }">
      <el-menu-item index="3">
        Events
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'cart-page' }">
      <el-menu-item index="4">
        Cart
      </el-menu-item>
    </router-link>
    <router-link :to="{ name: 'tickets-page' }">
      <el-menu-item index="5">
        My tickets
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style  scoped>
el-menu-item {
  padding: 0
}
a {
  text-decoration: none;
}
.flex-grow {
  flex-grow: 1;
}

@media (max-width:600px) {
  .el-menu--horizontal.el-menu {
    display: flex;
    flex-direction: column;
    border-bottom: none;
  }
}
</style>
