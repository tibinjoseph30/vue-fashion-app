<script setup lang="ts">
import { ref } from 'vue';
import { useFormData } from '../../constants/composables/OrderFormData';
import OrderDetails from './OrderDetails.vue';
import DeliveryDetails from './DeliveryDetails.vue';
import PaymentDetails from './PaymentDetails.vue';

const { formData } = useFormData();
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
      class="flex justify-between max-w-md mx-auto text-center text-gray-500"
    >
      <div :class="currentStep >= 0 ? 'font-bold text-black' : ''">1. Order</div>
      <div :class="currentStep >= 1 ? 'font-bold text-black' : ''">2. Contact</div>
      <div :class="currentStep >= 3 ? 'font-bold text-black' : ''">3. Delivery</div>
    </div>
    <component :is="steps[currentStep]" @next="nextStep" @back="prevStep" :formData="formData" />
    
  </div>
</template>
