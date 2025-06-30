import { reactive } from "vue";
import type { OrderForm } from "../interfaces/OrderFormInterface";

export const useFormData = () => {
  const formData = reactive<OrderForm>({
    order: {
      productId: '',
      quantity: 1,
    },
    delivery: {
      name: '',
      address: '',
      phone: '',
    },
    payment: {
      upiRef: '',
      screenshot: null,
    },
  });

  return { formData };
};