<script setup lang="ts">
import { ref } from "vue";
import OrderDetails from "./OrderDetails.vue";
import DeliveryDetails from "./DeliveryDetails.vue";
import { useOrderFormData } from "../../constants/composables/OrderFormData";

defineProps(["product"]);
const { formData } = useOrderFormData();
const currentStep = ref(0);

const steps = [OrderDetails, DeliveryDetails];

const nextStep = () => {
  if (currentStep.value < steps.length - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
</script>

<template>
  <div class="max-w-6/10 mx-auto">
    <div
      class="flex justify-center gap-16 max-w-md mx-auto text-center text-gray-500 mb-12"
    >
      <div :class="currentStep >= 0 ? 'font-bold text-black' : ''">
        1. Order
      </div>
      <div :class="currentStep >= 1 ? 'font-bold text-black' : ''">
        2. Delivery
      </div>
    </div>
    <component
      :is="steps[currentStep]"
      @next="nextStep"
      @back="prevStep"
      :formData="formData"
      v-bind="currentStep === 0 ? { productCode: product?.productCode } : {}"
    />
  </div>
</template>
