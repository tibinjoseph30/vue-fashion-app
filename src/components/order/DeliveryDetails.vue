[⚠️ Suspicious Content]
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineProps, defineEmits } from "vue";
import { deliverySchema } from "../../constants/validations/OrderFormValidation";

defineProps<{ formData: any }>();
const emit = defineEmits(["back", "next"]);
const schema = deliverySchema;

const onSubmit = () => emit("next");
</script>
<template>
  <Form :validation-schema="schema" @submit="onSubmit" class="grid gap-y-6">
    <div>
      <label class="form-label">First Name</label>
      <Field
        name="firstName"
        v-model="formData.delivery.firstName"
        class="form-control"
      />
      <ErrorMessage name="firstName" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Last Name</label>
      <Field
        name="lastName"
        v-model="formData.delivery.lastName"
        class="form-control"
      />
      <ErrorMessage name="lastName" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Phone</label>
      <Field
        name="phone"
        v-model="formData.delivery.phone"
        class="form-control"
      />
      <ErrorMessage name="phone" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Email</label>
      <Field
        name="email"
        v-model="formData.delivery.email"
        class="form-control"
      />
      <ErrorMessage name="email" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Address</label>
      <Field
        name="address"
        v-model="formData.delivery.address"
        class="form-control"
      />
      <ErrorMessage name="address" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Pincode</label>
      <Field
        name="pinCode"
        v-model="formData.delivery.pinCode"
        class="form-control"
      />
      <ErrorMessage name="pinCode" class="text-red-600 text-sm mt-1" />
    </div>
    <div class="flex gap-3">
      <button
        type="button"
        @click="$emit('back')"
        class="border border-black-500 rounded-md px-6 py-3 uppercase font-bold"
      >
        Back
      </button>
      <button
        type="submit"
        class="btn-primary px-6 py-3 rounded-md uppercase font-bold grow-1"
      >
        Next
      </button>
    </div>
  </Form>
</template>
