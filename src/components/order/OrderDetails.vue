<script setup lang="ts">
import { Field, Form } from "vee-validate";
import { ref } from "vue";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const props = defineProps(["data"]);
const emit = defineEmits(["update", "next"]);

const localData = ref({ ...props.data });

const handleNext = () => {
  emit("update", localData.value);
  emit("next");
};

const productSizes = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "2X Large" },
];
</script>

<template>
  <Form @submit="handleNext" class="grid gap-y-6">
    <div>
      <label for="productCode" class="form-label">Product Code</label>
      <Field
        name="productCode"
        v-model="localData.productCode"
        id="productCode"
        class="form-control"
      />
    </div>
    <div>
      <label for="product_code" class="form-label">Select Size</label>
      <Vue3Select
        v-model="localData.productSize"
        :options="productSizes"
        label-by="label"
        value-by="value"
        class="form-control"
      />
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
