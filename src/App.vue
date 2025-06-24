<script setup lang="ts">
import Header from './components/layout/Header.vue';
</script>

<template>
  <Header />
  <main>
    <RouterView :key="$route.path" />
  </main>
</template>
