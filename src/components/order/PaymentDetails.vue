<script setup lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import { paymentSchema } from "../../constants/validations/OrderFormValidation";
import PaymentMethod from "./PaymentMethod.vue";

const props = defineProps<{ formData: any }>();
const emit = defineEmits(["back"]);
const schema = paymentSchema;

const onSubmit = () => {
  alert("succesfully placed order");
  console.log(props.formData);
};
</script>
<template>
  <PaymentMethod />
  <Form
    :validation-schema="schema"
    @submit="onSubmit"
    class="grid gap-y-6 mt-6"
  >
    <div>
      <label class="form-label">Transaction ID</label>
      <Field
        name="transactionId"
        v-model="formData.payment.transactionId"
        class="form-control"
      />
      <ErrorMessage name="transactionId" class="text-red-600 text-sm mt-1" />
    </div>
    <div class="flex gap-6">
      <button
        type="button"
        @click="$emit('back')"
        class="border border-black-500 rounded-md px-6 py-3 uppercase font-bold"
      >
        Back
      </button>
      <div>
        <div class="text-slate-500">Total</div>
        <div class="font-bold">&#8377; 399</div>
      </div>
      <button
        type="button"
        class="bg-black text-white px-8 py-3 rounded-md uppercase font-bold grow-1"
      >
        Confirm on Whatsapp
      </button>
    </div>
    <div class="flex gap-3">
      <button
        type="submit"
        class="btn-primary px-8 py-3 rounded-md uppercase font-bold grow-1"
      >
        Place Order
      </button>
    </div>
  </Form>
</template>
