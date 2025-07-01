<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header
    class="fixed top-0 start-0 w-full grid items-center border-b border-gray-200 bg-white"
  >
    <div class="container">
      <div class="flex">
        <a href="">logo</a>
        <nav class="ms-auto flex gap-6">
          <li>
            <RouterLink to="/">Sale</RouterLink>
          </li>
          <li>
            <RouterLink to="/men">Men</RouterLink>
          </li>
          <li>
            <RouterLink to="/women">Women</RouterLink>
          </li>
        </nav>
      </div>
    </div>
  </header>
</template>
