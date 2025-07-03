<script setup lang="ts">
import womenFashion from "@/assets/images/women-fashion.jpg";
</script>

<template>
  <div
    class="grid grid-cols-7 gap-3 border border-gray-200 p-3 rounded-lg text-gray-500 mb-3"
  >
    <div>Product</div>
    <div>Customer</div>
    <div>Address</div>
    <div>Contact</div>
    <div>Transaction ID</div>
    <div>Status</div>
    <div>Date</div>
  </div>
  <div class="grid gap-3">
    <div
      class="grid items-center grid-cols-7 gap-3 shadow-lg/5 border border-gray-100 p-3 rounded-lg"
    >
      <div>
        <div class="flex items-center gap-3">
          <figure class="max-w-[50px]">
            <img :src="womenFashion" alt="" />
          </figure>
          <div><b>MTSH01</b> / L</div>
        </div>
      </div>
      <div>John Doe</div>
      <div>123 Main Street, Anytown, CA 91234</div>
      <div>
        <div>4565892148</div>
        <div>johndoe@gmail.com</div>
      </div>
      <div>1214789631654</div>
      <div>
        <span
          class="border border-yellow-600 text-yellow-600 rounded-md py-2 px-3"
        >
          Pending
        </span>
      </div>
      <div>30 Jun 2025</div>
    </div>
  </div>
</template>
