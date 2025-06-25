<script setup lang="ts">
import menFashion from "@/assets/images/men-fashion.jpg";
import womenFashion from "@/assets/images/women-fashion.jpg";
</script>

<template>
  <section class="section">
    <div class="container">
      <h2 class="text-center text-3xl font-bold uppercase mb-8">
        Our Top Picks
      </h2>
      <div class="grid gap-4 grid-cols-2">
        <div class="fashion-box relative">
          <picture>
            <img :src="menFashion" alt="Men Fashion" />
          </picture>
          <h4
            class="fashion-title absolute start-0 end-0 inline-flex justify-center text-white font-bold uppercase opacity-60 transition duration-300"
          >
            Shop Men
          </h4>
        </div>
        <div class="fashion-box relative">
          <picture>
            <img :src="womenFashion" alt="Men Fashion" />
          </picture>
          <h4
            class="fashion-title absolute start-0 end-0 inline-flex justify-center text-white font-bold uppercase opacity-60 transition duration-300"
          >
            Shop Women
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>
