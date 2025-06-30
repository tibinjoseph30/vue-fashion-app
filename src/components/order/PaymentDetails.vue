[⚠️ Suspicious Content] <script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineProps, defineEmits } from 'vue';
import { paymentSchema } from '../../constants/validations/OrderFormValidation';

const props = defineProps<{ formData: any }>();
const emit = defineEmits(['back', 'next']);
const schema = paymentSchema;

const onSubmit = () => {
  alert('Form submitted successfully');
  console.log(props.formData);
  emit('next');
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0] || null;
  props.formData.payment.screenshot = file;
};
</script>
<template>
  <Form :validation-schema="schema" @submit="onSubmit">
    <div>
      <label>UPI Reference ID</label>
      <Field name="upiRef" v-model="formData.payment.upiRef" />
      <ErrorMessage name="upiRef" />
    </div>
    <div>
      <label>Payment Screenshot</label>
      <input type="file" @change="onFileChange" />
      <ErrorMessage name="screenshot" />
    </div>
    <button type="button" @click="$emit('back')">Back</button>
    <button type="submit">Submit</button>
  </Form>
</template>
