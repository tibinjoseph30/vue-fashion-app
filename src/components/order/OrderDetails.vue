<script setup lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import { orderSchema } from "../../constants/validations/OrderFormValidation";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import { onMounted } from "vue";

const { formData, productCode } = defineProps<{
  formData: any;
  productCode?: string;
}>();
const emit = defineEmits(["next"]);

const schema = orderSchema;

onMounted(() => {
  if (productCode && !formData.order.productCode) {
    formData.order.productCode = productCode;
  }
});

const sizeOptions = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
];

const onSubmit = () => emit("next");
</script>

<template>
  <Form :validation-schema="schema" @submit="onSubmit" class="grid gap-y-6">
    <div>
      <label class="form-label">Product Code</label>
      <Field
        name="productCode"
        v-model="formData.order.productCode"
        class="form-control"
      />
      <ErrorMessage name="productCode" class="text-red-600 text-sm mt-1" />
    </div>
    <div>
      <label class="form-label">Size</label>
      <Field name="productSize" v-slot="{ field }">
        <Vue3Select
          v-bind="field"
          v-model="formData.order.productSize"
          :options="sizeOptions"
          option-label="label"
          option-value="value"
          :reduce="(option: any) => option.value"
          placeholder="Select size"
          class="form-control"
        />
      </Field>
      <ErrorMessage name="productSize" class="text-red-600 text-sm mt-1" />
    </div>
    <button
      type="submit"
      class="btn-primary px-8 py-3 rounded-md uppercase font-bold"
    >
      Next
    </button>
  </Form>
</template>
