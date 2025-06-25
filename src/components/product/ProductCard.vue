<script setup lang="ts">
defineProps(["product"]);
</script>

<template>
  <div class="product-card">
    <div class="product-figure">
      <a href="#" class="product-img-container relative overflow-hidden block">
        <img
          :src="product.thumbnailImage"
          :alt="product.productName"
          class="absolute top-0 start-0 h-full w-full object-cover max-w-full block"
        />
      </a>
    </div>
    <div class="product-info pt-4">
      <div class="text-sm">
        <router-link :to="`/collections/${product.productCode}`">
          {{ product.productName }}
        </router-link>
      </div>
      <div class="font-bold">&#8377; {{ product.price }}</div>
    </div>
  </div>
</template>
