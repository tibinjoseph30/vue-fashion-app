<script setup lang="ts">
import { ErrorMessage, Field, Form, useForm } from "vee-validate";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import { orderSchema } from "../../constants/orderFormValidation";
import type { OrderSection } from "../../constants/orderFormInterface";

const props = defineProps<{ data: OrderSection }>();
const emit = defineEmits<{
  (e: "update", data: OrderSection): void;
  (e: "next"): void;
}>();

const { handleSubmit } = useForm<OrderSection>({
  validationSchema: orderSchema,
  initialValues: props.data,
});

function handleNext(values: OrderSection) {
  emit("update", values);
  emit("next");
}

const productSizes = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "2X Large" },
];
</script>

<template>
  <Form @submit="handleSubmit(handleNext)" class="grid gap-y-6">
    <div>
      <label for="productCode" class="form-label">Product Code</label>
      <Field name="productCode" id="productCode" class="form-control" />
      <ErrorMessage name="productCode" class="text-red-500 text-sm mt-1" />
    </div>

    <div>
      <label for="productSize" class="form-label">Select Size</label>
      <Field name="productSize" v-slot="{ value, handleChange }">
        <Vue3Select
          :modelValue="value"
          @update:modelValue="handleChange"
          :options="productSizes"
          label-by="label"
          value-by="value"
          class="form-control"
        />
      </Field>
      <ErrorMessage name="productSize" class="text-red-500 text-sm mt-1" />
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        class="btn-primary font-bold uppercase px-10 py-3 rounded-md"
      >
        Next
      </button>
    </div>
  </Form>
</template>
