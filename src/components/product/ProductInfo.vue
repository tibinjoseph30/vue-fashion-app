<script setup lang="ts">
defineProps(["product"]);
</script>

<template>
  <div class="h-full grid">
    <div>
      <div class="text-lg font-semibold">
        {{ product.productName }}
      </div>
      <div class="flex gap-3 mt-3">
        <div>Product Code: {{ product.productCode }}</div>
        <div class="text-green-700">Available</div>
      </div>
      <div class="text-2xl font-semibold mt-1">&#8377; {{ product.price }}</div>
      <div class="mt-4">
        <span class="font-semibold mb-2 block">Size:</span>
        <ul class="flex items-center flex-wrap gap-3 product-size">
          <li>s</li>
          <li>m</li>
          <li>l</li>
          <li>xl</li>
          <li>2xl</li>
          <div class="text-sm ms-auto underline">Size Chart</div>
        </ul>
      </div>
    </div>
    <div class="flex gap-3 mt-auto">
      <button class="btn-primary p-3 rounded-md uppercase font-bold w-full">
        Order Now
      </button>
      <button
        class="border border-black-500 p-3 rounded-md uppercase font-bold w-full"
      >
        Ask on WhatsApp
      </button>
    </div>
  </div>
</template>
