<script setup lang="ts">
defineProps(['product']);
</script>

<template>
    <div class="product-card">
        <div class="product-figure">
            <a href="#" class="product-img-container relative overflow-hidden block">
                <img :src="product.productImage1" :alt="product.productName"
                    class="absolute top-0 start-0 h-full w-full object-cover max-w-full block">
            </a>
        </div>
        <div class="product-info pt-4">
            <div class="text-sm">
                <router-link :to="`collections/${product.productCode}`">{{ product.productName }}</router-link>
            </div>
            <div class="font-bold">&#8377; {{ product.price }}</div>
            <div class="text-sm mt-1 text-slate-500">PID: <span class="font-semibold">{{ product.productCode }}</span>
            </div>
        </div>
    </div>
</template>