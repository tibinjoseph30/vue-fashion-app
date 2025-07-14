<script setup lang="ts">
import { Field, Form, useField, useForm } from "vee-validate";
import { computed, ref, watch } from "vue";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const categoryOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Child Boy", value: "childBoy" },
  { label: "Child Girl", value: "childGirl" },
  { label: "Newborn", value: "newborn" },
];

const subCategoryMap: Record<string, { label: string; value: string }[]> = {
  men: [
    { label: "Shirts", value: "shirts" },
    { label: "T-Shirts", value: "tshirts" },
    { label: "Pants", value: "pants" },
  ],
  women: [
    { label: "Curtees", value: "curtees" },
    { label: "Top", value: "top" },
    { label: "Sarees", value: "sarees" },
  ],
  childBoy: [
    { label: "T-shirts", value: "tshirts" },
    { label: "Pants", value: "pants" },
  ],
  childGirl: [
    { label: "T-shirts", value: "tshirts" },
    { label: "Top", value: "top" },
  ],
  newborn: [
    { label: "Onesies", value: "onesies" },
    { label: "Blankets", value: "blankets" },
  ],
};

const selectedCategory = ref<string>("");

const { value: categoryValue } = useField<string>("productCategory");

watch(categoryValue, (val) => {
  selectedCategory.value = val;
});

const subCategoryOptions = computed(() => {
  return subCategoryMap[selectedCategory.value] || [];
});

const onSubmit = (values: any) => {
  alert(JSON.stringify(values, null, 2));
};
</script>
<template>
  <Form @submit="onSubmit" class="grid grid-cols-2 gap-y-6 gap-x-4">
    <div>
      <label for="" class="form-label">Select Category</label>
      <Field name="productCategory" v-slot="{ field }">
        <Vue3Select
          v-model="field.value"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          :searchable="false"
          :clearable="false"
          class="form-control"
        />
      </Field>
    </div>
    <div v-if="selectedCategory">
      <label for="" class="form-label">Select Sub Category</label>
      <Field name="productSubCategory" v-slot="{ field }">
        <Vue3Select
          v-model="field.value"
          :options="subCategoryOptions"
          option-label="label"
          option-value="value"
          :searchable="false"
          :clearable="false"
          class="form-control"
        />
      </Field>
    </div>
    <div v-if="selectedCategory">
      <label for="" class="form-label">Product Code</label>
      <Field name="productCode" class="form-control" />
    </div>
    <div>
      <label for="" class="form-label">Price</label>
      <Field name="price" class="form-control" />
    </div>
    <button
      type="submit"
      class="bg-gray-900 px-4 py-3 rounded-md font-bold uppercase text-white"
    >
      Add Product
    </button>
  </Form>
</template>
