<script setup lang="ts">
defineProps(["product"]);
</script>
<template>
  <div>
    <div
      class="flex gap-4 p-4 rounded-lg border border-gray-200 shadow-lg shadow-gray-200/50"
    >
      <figure>
        <img :src="product.thumbnailImage" :alt="product.thumbnailImage" />
      </figure>
      <div>
        <div>{{ product.productName }}</div>
        <div>&#8377; {{ product.price }}</div>
      </div>
    </div>
  </div>
</template>
