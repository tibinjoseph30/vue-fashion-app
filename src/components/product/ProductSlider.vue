<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

defineProps<{
  slider: string[];
}>();
</script>

<template>
  <swiper
    :modules="[Navigation, Pagination]"
    :slidesPerView="2"
    :spaceBetween="15"
    navigation
    pagination
    class="product-slider w-full"
  >
    <swiper-slide v-for="(slide, index) in slider" :key="index">
      <img :src="slide" />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-slide img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
