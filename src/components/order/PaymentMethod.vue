<script setup lang="ts">
import qrCode from "@/assets/images/sample-qr.png";
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-[200px]">
      <figure>
        <img :src="qrCode" alt="qr" />
      </figure>
      <div class="payment-seperation text-center my-2">OR</div>
      <div class="text-center">john.doe@oksbi</div>
    </div>
  </div>
</template>
