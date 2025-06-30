<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import { orderSchema } from '../../constants/validations/OrderFormValidation';

defineProps<{ formData: any }>();
const emit = defineEmits(['next']);
const schema = orderSchema;

const onSubmit = () => emit('next');
</script>

<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <div>
      <label class="form-label">Product ID</label>
      <Field name="productId" v-model="formData.order.productId" class="form-control" />
      <ErrorMessage name="productId" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Quantity</label>
      <Field name="quantity" type="number" v-model="formData.order.quantity" class="form-control" />
      <ErrorMessage name="quantity" />
    </div>
    <button type="submit" class="btn-primary px-8 py-3 rounded-md">Next</button>
  </Form>
</template>
