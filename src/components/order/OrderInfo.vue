<script setup lang="ts">
import sampleQR from "@/assets/images/sample-qr.png";
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
    <div class="qr-code-head text-gray-500 text-center text-sm mt-6 mb-3">
      Scan to pay
    </div>
    <div class="flex justify-center">
      <picture>
        <img :src="sampleQR" alt="sample qr" />
      </picture>
    </div>
    <div class="mt-3">
      <p class="font-semibold">
        No checkout hassle — just scan this QR code with any UPI app and
        complete your payment in seconds.
      </p>
      <p class="text-sm mt-2 text-gray-600">
        <b>Note:</b> Don’t forget to upload the payment screenshot during the
        order process to confirm your purchase. Fast, secure, and easy!
      </p>
    </div>
  </div>
</template>
