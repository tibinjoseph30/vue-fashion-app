<script setup lang="ts">
import womenFashion from "@/assets/images/women-fashion.jpg";
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db } from "../../../firebase/firebase.config";
const orders = ref<any[]>([]);
const isLoading = ref(true);

const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    orders.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(orders.value);
  } catch (error) {
    console.log("error in data fetching:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});
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
    <div>Date</div>
  </div>
  <div class="grid gap-3">
    <div
      v-for="order in orders"
      :key="order.id"
      class="grid items-center grid-cols-7 gap-3 shadow-lg/5 border border-gray-100 p-3 rounded-lg"
    >
      <div>
        <div class="flex items-center gap-3">
          <figure class="max-w-[50px]">
            <img :src="womenFashion" alt="" />
          </figure>
          <div>
            <b>{{ order.order.productCode }}</b> / {{ order.order.productSize }}
          </div>
        </div>
      </div>
      <div>{{ order.delivery.firstName }} {{ order.delivery.lastName }}</div>
      <div>{{ order.delivery.address }}</div>
      <div>
        <div>Mob: {{ order.delivery.phone }}</div>
        <div>Email: {{ order.delivery.email }}</div>
      </div>
      <div>{{ order.payment.transactionId }}</div>
      <div>30 Jun 2025</div>
    </div>
  </div>
</template>
