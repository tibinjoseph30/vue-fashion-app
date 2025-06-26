<script setup lang="ts">
import { ref } from "vue";
import Step1 from "./OrderDetails.vue";
import Step2 from "./DeliveryDetails.vue";
import Step3 from "./PaymentDetails.vue";
import { defaultOrderFormData } from "../../constants/orderFormData";
import type { OrderForm } from "../../constants/orderFormInterface";

const step = ref(1);
const totalSteps = 3;

const formData = ref<OrderForm>({ ...defaultOrderFormData });

const next = () => {
  if (step.value < totalSteps) {
    step.value++;
  }
};

const prev = () => {
  if (step.value > 1) {
    step.value--;
  }
};

const submitOrder = () => {
  console.log("submitted order:", formData.value);
  alert("Order submitted successfully!");
};
</script>

<template>
  <div class="max-w-6/10 mx-auto">
    <div
      class="flex justify-between max-w-md mx-auto text-center text-gray-500"
    >
      <div :class="step >= 1 ? 'font-bold text-black' : ''">1. Order</div>
      <div :class="step >= 2 ? 'font-bold text-black' : ''">2. Delivery</div>
      <div :class="step >= 3 ? 'font-bold text-black' : ''">3. Payment</div>
    </div>

    <div class="mt-10">
      <Step1
        v-if="step === 1"
        :data="formData.order"
        @update="formData.order = $event"
        @next="next"
      />
      <Step2 v-if="step === 2" @back="prev" @next="next" />
      <Step3 v-if="step === 3" @back="prev" @submit="submitOrder" />
    </div>
  </div>
</template>
