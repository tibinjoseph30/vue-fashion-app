<script setup lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import { paymentSchema } from "../../constants/validations/OrderFormValidation";
import PaymentMethod from "./PaymentMethod.vue";
import { onMounted, ref } from "vue";
import { supabase } from "../../config/supabaseClient";
const props = defineProps<{ product: any; formData: any }>();
const emit = defineEmits(["back"]);
const schema = paymentSchema;

const isConfirmOnWhatsapp = ref(false);
const isvalidateTransaction = props.formData.payment.transactionId?.length >= 6;
const isPlacingorder = ref(false);

onMounted(() => {
  isConfirmOnWhatsapp.value = isvalidateTransaction;
});

const handleTransactionChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  isConfirmOnWhatsapp.value = value.length >= 6;
};

const handleClick = () => {
  alert("you clicked, confirm on whatsapp");
};

const onSubmit = async () => {
  isPlacingorder.value = true;
  try {
    const orderData = {
      ...props.formData,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("orders").insert([orderData]);

    if (error) {
      console.error("Error inserting order:", error);
      alert("Something went wrong while placing the order.");
    } else {
      console.log("Saved to Supabase:", data);
      alert("Order successfully placed!");
    }
  } catch (error) {
    console.log("error in placing order:", error);
    alert("Something went wrong while placing the order.");
  } finally {
    isPlacingorder.value = false;
  }
};
</script>
<template>
  <PaymentMethod :product="product" />
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
        @input="handleTransactionChange"
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
        <div class="font-bold">&#8377; {{ props.product.price }}</div>
      </div>
      <button
        @click="handleClick"
        type="button"
        :disabled="!isConfirmOnWhatsapp"
        class="bg-black text-white px-8 py-3 rounded-md uppercase font-bold grow-1 disabled:opacity-75"
      >
        Confirm on Whatsapp
      </button>
    </div>
    <div class="flex gap-3">
      <button
        type="submit"
        class="btn-primary px-8 py-3 rounded-md uppercase font-bold grow-1 disabled:opacity-75"
        :disabled="isPlacingorder"
      >
        {{ isPlacingorder ? "Placing Order" : "Place Order" }}
      </button>
    </div>
  </Form>
</template>
