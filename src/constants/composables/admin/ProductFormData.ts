import { reactive } from "vue";
import type { ProductForm } from "../../interfaces/admin/ProductFormInterface";

export const useProductFormData = () => {
  const productData = reactive<ProductForm>({
    category: "",
    sub_category: "",
    product_code: "",
    product_name: "",
    price: "",
    quantity: "",
    description: "",
    sizes: [],
    images: [],
    thumbnail: "",
  });

  return { productData };
};
