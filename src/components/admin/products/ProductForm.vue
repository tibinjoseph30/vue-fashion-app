<script setup lang="ts">
import { Field, Form, useField } from "vee-validate";
import { ref, watch } from "vue";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";

const categoryOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
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
};

const codeMap: Record<string, string> = {
  men: "M",
  women: "W",
  shirts: "SHR",
  tshirts: "TSH",
  pants: "PNT",
  curtees: "CUR",
  top: "TOP",
  sarees: "SAR",
};

const allSizes = ["S", "M", "L", "XL", "2XL"];

const brandShortName = "MF";
const productCode = ref("");
let productCounter = 1;

const { value: categoryField } = useField<string>("productCategory");
const { value: subCategoryField } = useField<string>("productSubCategory");

const subCategoryOptions = ref<{ label: string; value: string }[]>([]);

const selectedFiles = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);

watch(categoryField, (val: any) => {
  const key = typeof val === "string" ? val : val?.value || "";
  subCategoryField.value = ""; // reset
  subCategoryOptions.value = subCategoryMap[key] || [];
});

watch([categoryField, subCategoryField], ([cat, sub]) => {
  if (cat && sub) {
    const categoryCode = codeMap[cat as keyof typeof codeMap] || "";
    const subCategoryCode = codeMap[sub as keyof typeof codeMap] || "";
    const formattedNumber = String(productCounter).padStart(2, "0");
    productCode.value = `${brandShortName}-${categoryCode}${subCategoryCode}${formattedNumber}`;
  } else {
    productCode.value = "";
  }
});

const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  imagePreviews.value = [];
  selectedFiles.value = [];

  if (files) {
    const fileList = Array.from(files);
    selectedFiles.value = fileList;

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
};

const onSubmit = async (values: any) => {
  console.log("form submitted:", values);
};
</script>

<template>
  <Form @submit="onSubmit" class="grid grid-cols-2 gap-y-6 gap-x-4">
    <div>
      <label class="form-label">Category</label>
      <Field name="productCategory" v-slot="{ field }">
        <Vue3Select
          v-bind="field"
          v-model="categoryField"
          :options="categoryOptions"
          option-label="label"
          option-value="value"
          :reduce="(option: any) => option.value"
          :searchable="false"
          :clearable="false"
          placeholder="Select"
          class="form-control"
        />
      </Field>
    </div>

    <div v-if="categoryField">
      <label class="form-label">Sub Category</label>
      <Field name="productSubCategory" v-slot="{ field }">
        <Vue3Select
          v-bind="field"
          v-model="subCategoryField"
          :options="subCategoryOptions"
          option-label="label"
          option-value="value"
          :reduce="(option: any) => option.value"
          :searchable="false"
          :clearable="false"
          placeholder="Select"
          class="form-control"
        />
      </Field>
    </div>

    <div v-if="categoryField">
      <label class="form-label">Product Code</label>
      <Field
        name="productCode"
        v-model="productCode"
        readonly
        class="form-control"
      />
    </div>

    <div>
      <label class="form-label">Price</label>
      <Field name="price" class="form-control" />
    </div>
    <div>
      <label class="form-label">Product Name</label>
      <Field name="productName" class="form-control" />
    </div>
    <div>
      <label class="form-label">Quantity(No. of sets)</label>
      <Field name="quantity" class="form-control" />
    </div>
    <div>
      <label class="form-label">Sizes</label>
      <div class="flex gap-6">
        <div class="form-check" v-for="size in allSizes" :key="size">
          <input type="checkbox" :id="`size_${size}`" :value="size" />
          <label :for="`size_${size}`">{{ size }}</label>
        </div>
      </div>
    </div>

    <div class="col-span-2">
      <label class="form-label">Description</label>
      <Field name="productDescription" class="form-control" />
    </div>

    <div class="col-span-2">
      <label class="form-label">Images</label>
      <input
        type="file"
        class="form-control"
        multiple
        accept="image/*"
        @change="handleImageUpload"
      />
      <div class="flex gap-2 mt-2 flex-wrap">
        <img
          v-for="(img, index) in imagePreviews"
          :key="index"
          :src="img"
          class="w-20 h-20 object-cover border rounded"
          alt="Image preview"
        />
      </div>
    </div>

    <button
      type="submit"
      class="bg-gray-900 px-4 py-3 rounded-md font-bold uppercase text-white"
    >
      Add Product
    </button>
  </Form>
</template>
