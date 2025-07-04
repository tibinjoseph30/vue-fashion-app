<script setup lang="ts">
import { ref } from "vue";
import OrderDetails from "./OrderDetails.vue";
import DeliveryDetails from "./DeliveryDetails.vue";
import { useOrderFormData } from "../../constants/composables/OrderFormData";
import PaymentDetails from "./PaymentDetails.vue";

defineProps(["product"]);
const { formData } = useOrderFormData();
const currentStep = ref(0);

const steps = [OrderDetails, DeliveryDetails, PaymentDetails];

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
      class="stepper flex justify-center gap-16 max-w-md mx-auto text-center text-gray-500 mb-12"
    >
      <div :class="currentStep >= 0 ? 'active' : ''" class="step">
        <span class="stepper-count">1</span>
        <span>Order</span>
      </div>
      <div :class="currentStep >= 1 ? 'active' : ''" class="step">
        <span class="stepper-count">2</span>
        <span>Delivery</span>
      </div>
      <div :class="currentStep >= 2 ? 'active' : ''" class="step">
        <span class="stepper-count">3</span>
        <span>Payments</span>
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
