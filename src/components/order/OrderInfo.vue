<script setup lang="ts">
defineProps(["product"]);
</script>
<template>
    <div class="sticky top-0">
        <div class="flex gap-4">
            <figure>
                <img :src="product.thumbnailImage" :alt="product.thumbnailImage"/>
            </figure>
            <div>
                <div>{{ product.productName }}</div>
                <div>&#8377; {{ product.price }}</div>
            </div>
        </div>
    </div>
</template>