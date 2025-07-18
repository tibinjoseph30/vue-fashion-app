<script setup lang="ts">
import { Field, Form, useField } from "vee-validate";
import { ref, watch } from "vue";
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import { useProductFormData } from "../../../constants/composables/admin/ProductFormData";
import { supabase } from "../../../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";

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

const isSubmitting = ref(false);

const allSizes = ["S", "M", "L", "XL", "2XL"];
const brandShortName = "MF";
const productCode = ref("");
let productCounter = 1;

const { value: categoryField } = useField<string>("category");
const { value: subCategoryField } = useField<string>("sub_category");

const subCategoryOptions = ref<{ label: string; value: string }[]>([]);
const sliderFiles = ref<File[]>([]);
const sliderPreviews = ref<{ file: File; preview: string }[]>([]);
const thumbnailIndex = ref<number | null>(null);

const { productData } = useProductFormData();

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

const handleProductImages = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files ? Array.from(input.files) : [];
  sliderFiles.value = files;
  sliderPreviews.value = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));
};

const uploadImage = async (file: File, path: string): Promise<string> => {
  const { error } = await supabase.storage
    .from("product")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from("product").getPublicUrl(path);

  return data.publicUrl;
};

const onSubmit = async () => {
  isSubmitting.value = true;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("Not logged in!");
    return;
  }

  const id = uuidv4();
  const folder = `${user.id}/${id}`;

  try {
    const sliderUrls: string[] = [];

    for (let i = 0; i < sliderFiles.value.length; i++) {
      const file = sliderFiles.value[i];
      const url = await uploadImage(file, `${folder}/slider_${i + 1}.jpg`);
      sliderUrls.push(url);
    }

    const thumbnailUrl =
      thumbnailIndex.value != null ? sliderUrls[thumbnailIndex.value] : "";

    productData.category = categoryField.value;
    productData.sub_category = subCategoryField.value;
    productData.product_code = productCode.value;
    productData.images = sliderUrls;
    productData.thumbnail = thumbnailUrl;

    const { error } = await supabase.from("products").insert([
      {
        ...productData,
        user_id: user.id,
        created_at: new Date().toISOString(),
      },
    ]);
    console.log(productData);

    if (error) throw error;

    alert("Product added successfully!");
  } catch (error) {
    console.log("error addind product:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <Form @submit="onSubmit" class="grid grid-cols-2 gap-y-6 gap-x-4">
    <div>
      <label class="form-label">Category</label>
      <Field name="category" v-slot="{ field }">
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
      <Field name="sub_category" v-slot="{ field }">
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
        name="product_code"
        v-model="productCode"
        readonly
        class="form-control"
      />
    </div>

    <div>
      <label class="form-label">Price</label>
      <Field name="price" v-model="productData.price" class="form-control" />
    </div>
    <div>
      <label class="form-label">Product Name</label>
      <Field
        name="product_name"
        v-model="productData.product_name"
        class="form-control"
      />
    </div>
    <div>
      <label class="form-label">Quantity(No. of sets)</label>
      <Field
        name="quantity"
        v-model="productData.quantity"
        class="form-control"
      />
    </div>
    <div>
      <label class="form-label">Sizes</label>
      <div class="flex gap-6">
        <Field name="sizes" v-slot="{ value, handleChange }">
          <div class="form-check" v-for="size in allSizes" :key="size">
            <input
              type="checkbox"
              :id="`size_${size}`"
              :value="size"
              :checked="value?.includes(size)"
              @change="handleChange($event)"
            />
            <label :for="`size_${size}`">{{ size }}</label>
          </div>
        </Field>
      </div>
    </div>

    <div class="col-span-2">
      <label class="form-label">Description</label>
      <Field
        name="productDescription"
        v-model="productData.description"
        class="form-control"
      />
    </div>

    <div class="col-span-2">
      <label class="form-label">Images</label>
      <Field name="images" v-slot="{ field }">
        <input
          type="file"
          class="form-control"
          multiple
          accept="image/*"
          @change="
            (e) => {
              handleProductImages(e);
              field.onChange(e);
            }
          "
        />
      </Field>
      <div class="mt-4">
        <label for="" class="form-label">Select Thumbnail</label>
        <div class="flex flex-wrap gap-3">
          <div
            v-for="(file, index) in sliderPreviews"
            :key="index"
            class="flex flex-col items-center"
          >
            <img :src="file.preview" class="preview-img" />
            <label>
              <input
                type="radio"
                :value="index"
                v-model="thumbnailIndex"
                name="thumbnail"
              />
            </label>
          </div>
        </div>
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

<style scoped>
.preview-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 2px solid #999;
}
</style>
