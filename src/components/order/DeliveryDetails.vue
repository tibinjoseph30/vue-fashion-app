[⚠️ Suspicious Content] <script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineProps, defineEmits } from 'vue';
import { deliverySchema } from '../../constants/validations/OrderFormValidation';

defineProps<{ formData: any }>();
const emit = defineEmits(['next', 'back']);
const schema = deliverySchema;

const onSubmit = () => emit('next');
</script>
<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <div>
      <label>Name</label>
      <Field name="name" v-model="formData.delivery.name" />
      <ErrorMessage name="name" />
    </div>
    <div>
      <label>Address</label>
      <Field name="address" v-model="formData.delivery.address" />
      <ErrorMessage name="address" />
    </div>
    <div>
      <label>Phone</label>
      <Field name="phone" v-model="formData.delivery.phone" />
      <ErrorMessage name="phone" />
    </div>
    <button type="button" @click="$emit('back')">Back</button>
    <button type="submit">Next</button>
  </Form>
</template>
