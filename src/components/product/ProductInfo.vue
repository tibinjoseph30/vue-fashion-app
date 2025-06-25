<script setup lang="ts">
defineProps(["product"]);
</script>

<template>
  <div class="h-full grid">
    <div>
      <div class="text-lg font-semibold uppercase">
        {{ product.productName }}
      </div>
      <div class="flex gap-4">
        <div class="uppercase text-sm">
          Product Code:
          <span>{{ product.productCode }}</span>
        </div>
      </div>
      <div class="text-green-700 mt-2">Available</div>
      <!-- <div class="text-red-700 mt-2">Sold Out</div> -->
      <div class="text-2xl font-semibold mt-1">
        &#8377; {{ product.price }}.00
        <span class="text-sm">(Inclusive of all charges)</span>
      </div>
      <!-- <div class="text-sm bg-yellow-100 p-3 rounded-md mt-1">
        This item is currently sold out, but you can still order it today.
        Probably delivery in 18-26 business days.
      </div> -->
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
      <router-link
        :to="`/order/${product.productCode}`"
        class="basis-1/2 shrink-0 grow"
      >
        <button class="btn-primary p-3 rounded-md uppercase font-bold w-full">
          Order Now
        </button>
      </router-link>
      <button
        class="border border-black-500 p-3 rounded-md uppercase font-bold basis-1/2 shrink-0 grow"
      >
        Ask on WhatsApp
      </button>
    </div>
  </div>
</template>
