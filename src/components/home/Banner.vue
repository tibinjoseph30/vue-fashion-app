<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    'https://levi.in/cdn/shop/files/Desktop.png?v=1749701849',
    'https://levi.in/cdn/shop/files/Desktop_2_0c796dda-c933-4b44-ae7b-9130b9964011.jpg?v=1742968200',
    'https://levi.in/cdn/shop/files/Desktop_3_21cc58c8-702c-4f13-910d-0be99afe797c.jpg?v=1748412556',
];
</script>

<style scoped>
.mySwiper {
  width: 100%;
  height: auto;
}
</style>

<template>
    <Swiper 
        :modules="[Pagination]"
        :slides-per-view="1" 
        :space-between="5"
        :pagination="{ clickable: true }"  
        class="mySwiper"
    >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <img :src="slide" class="w-full" />
        </swiper-slide>
    </swiper>
</template>