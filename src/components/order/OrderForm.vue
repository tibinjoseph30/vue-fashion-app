<script setup lang="ts">
import { ref } from "vue";
import Step1 from "./OrderDetails.vue";
import Step2 from "./DeliveryDetails.vue";
import Step3 from "./PaymentDetails.vue";

const step = ref(1);
const totalSteps = 3;

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
</script>

<template>
  <div>
    <div class="flex gap-10 justify-center">
      <span :class="{ 'font-bold': step === 1 }">Order</span>
      <span :class="{ 'font-bold': step === 2 }">Delivery</span>
      <span :class="{ 'font-bold': step === 3 }">Payment</span>
    </div>
    <Step1 v-if="step === 1" @next="next" />
    <Step2 v-if="step === 2" @back="prev" @next="next" />
    <Step3 v-if="step === 3" @back="prev" />
  </div>
</template>
