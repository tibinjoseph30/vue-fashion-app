<script setup lang="ts">
import { useRoute } from "vue-router";
import OrderForm from "../components/order/OrderForm.vue";
import OrderInfo from "../components/order/OrderInfo.vue";

type Product = {
  productCode: string;
  productName: string;
  price: string;
  thumbnailImage: string;
  sliderImages: {
    sliderImage1: string;
    sliderImage2: string;
    sliderImage3: string;
    sliderImage4: string;
  };
};

const route = useRoute();
const newProductCode = route.params.productCode as string;

const products: Record<string, Product[]> = {
  men: [
    {
      productCode: "MTSH01",
      productName: "Mens Colorblock Slim Fit T-Shirt",
      price: "499",
      thumbnailImage:
        "https://levi.in/cdn/shop/files/A68520025_01_Styleshot_360x.jpg?v=1737051584",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A68520025_01_Styleshot.jpg?v=1737051584",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A68520025_04_Detail.jpg?v=1737051584",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A68520025_05_Side.jpg?v=1737051584",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A68520025_03_Back.jpg?v=1737051584",
      },
    },
    {
      productCode: "MTSH02",
      productName: "Mens Typographic Print Slim Fit T-Shirt",
      price: "699",
      thumbnailImage:
        "https://levi.in/cdn/shop/files/169601329_05_Styleshot_360x.jpg?v=1734715819",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A66350040_05_Side.jpg?v=1743500327",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A66350040_02_Front.jpg?v=1743500328",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A66350040_04_Detail.jpg?v=1743500327",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A66350040_03_Back.jpg?v=1743500327",
      },
    },
    {
      productCode: "MTSH03",
      productName: "Mens Solid Slim Fit Polo T-Shirt",
      price: "699",
      thumbnailImage:
        "https://levi.in/cdn/shop/files/0039V0000_01_Styleshot_360x.jpg?v=1736840798",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A66350040_05_Side.jpg?v=1743500327",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A66350040_02_Front.jpg?v=1743500328",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A66350040_04_Detail.jpg?v=1743500327",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A66350040_03_Back.jpg?v=1743500327",
      },
    },
    {
      productCode: "MTSH04",
      productName: "Mens Plain Slim Fit T-Shirt",
      price: "699",
      thumbnailImage:
        "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2025/MARCH/11/RHUoFLpn_29c59e8ed7d640c9a05555f7619b7194.jpg",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A66350040_05_Side.jpg?v=1743500327",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A66350040_02_Front.jpg?v=1743500328",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A66350040_04_Detail.jpg?v=1743500327",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A66350040_03_Back.jpg?v=1743500327",
      },
    },
  ],
  women: [
    {
      productCode: "WTSH01",
      productName: "Mens Colorblock Slim Fit T-Shirt",
      price: "499",
      thumbnailImage:
        "https://levi.in/cdn/shop/files/A39210010_05_Styleshot_360x.jpg?v=1734715825",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A66350040_05_Side.jpg?v=1743500327",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A66350040_02_Front.jpg?v=1743500328",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A66350040_04_Detail.jpg?v=1743500327",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A66350040_03_Back.jpg?v=1743500327",
      },
    },
    {
      productCode: "WTSH02",
      productName: "Mens Typographic Print Slim Fit T-Shirt",
      price: "699",
      thumbnailImage:
        "https://levi.in/cdn/shop/files/0003K0003_05_Styleshot_360x.jpg?v=1734096117",
      sliderImages: {
        sliderImage1:
          "https://levi.in/cdn/shop/files/A66350040_05_Side.jpg?v=1743500327",
        sliderImage2:
          "https://levi.in/cdn/shop/files/A66350040_02_Front.jpg?v=1743500328",
        sliderImage3:
          "https://levi.in/cdn/shop/files/A66350040_04_Detail.jpg?v=1743500327",
        sliderImage4:
          "https://levi.in/cdn/shop/files/A66350040_03_Back.jpg?v=1743500327",
      },
    },
  ],
};

const allProducts = [...products.men, ...products.women];
const product = allProducts.find((p) => p.productCode === newProductCode);
</script>

<template>
  <section class="py-6">
    <div class="container">
      <div class="order-details flex">
        <div class="order-form-block">
          <OrderForm :product="product" />
        </div>
        <div class="order-info-block ps-8">
          <OrderInfo :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>
