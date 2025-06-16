<script setup lang="ts">
import ProductCard from '../components/product/ProductCard.vue';

type Product = {
    productCode: string;
    productName: string;
    price: string;
    productImage1: string;
};

const { collectionId } = defineProps<{ collectionId: string }>();

const products: Record<string, Product[]> = {
    men: [
        {
            productCode: "MTSH01",
            productName: "Mens Colorblock Slim Fit T-Shirt",
            price: "499",
            productImage1: "https://levi.in/cdn/shop/files/A68520025_01_Styleshot_360x.jpg?v=1737051584"
        },
        {
            productCode: "MTSH02",
            productName: "Mens Typographic Print Slim Fit T-Shirt",
            price: "699",
            productImage1: "https://levi.in/cdn/shop/files/169601329_05_Styleshot_360x.jpg?v=1734715819"
        },
        {
            productCode: "MTSH03",
            productName: "Mens Solid Slim Fit Polo T-Shirt",
            price: "699",
            productImage1: "https://levi.in/cdn/shop/files/0039V0000_01_Styleshot_360x.jpg?v=1736840798"
        },
        {
            productCode: "MTSH04",
            productName: "Mens Plain Slim Fit T-Shirt",
            price: "699",
            productImage1: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MARCH/11/RHUoFLpn_29c59e8ed7d640c9a05555f7619b7194.jpg"
        },
    ],
    women: [
        {
            productCode: "MTSH01",
            productName: "Mens Colorblock Slim Fit T-Shirt",
            price: "499",
            productImage1: "https://levi.in/cdn/shop/files/A68520025_01_Styleshot_360x.jpg?v=1737051584"
        },
        {
            productCode: "MTSH02",
            productName: "Mens Typographic Print Slim Fit T-Shirt",
            price: "699",
            productImage1: "https://levi.in/cdn/shop/files/169601329_05_Styleshot_360x.jpg?v=1734715819"
        }
    ]
};

const collectionProducts = products[collectionId] || [];

</script>

<template>
    <section class="py-6">
        <div class="container mx-auto">
            <h2 class="text-center text-3xl font-bold uppercase mb-8">New Arrivals {{ collectionId }}</h2>
            <div class="grid grid-cols-4 gap-6">
                <ProductCard v-for="product in collectionProducts" :key="product.productCode" :product="product" />
            </div>
        </div>
    </section>
</template>