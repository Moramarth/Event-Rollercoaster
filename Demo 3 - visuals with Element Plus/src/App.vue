<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><AppHeader /></el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer><AppFooter /></el-footer>
    </el-container>
  </div>
</template>

<style scoped>
footer {
  text-align: center;
}
@media (max-width:600px) {
  main {
    margin-top: 20rem
  }
}
</style>
