import { reactive } from "vue";
import type { OrderForm } from "../interfaces/OrderFormInterface";

export const useOrderFormData = () => {
  const formData = reactive<OrderForm>({
    order: {
      productCode: "",
      productSize: "",
    },
    delivery: {
      firstName: "",
      LastName: "",
      phone: "",
      email: "",
      address: "",
      pinCode: "",
    },
    payment: {
      transactionId: "",
    },
  });

  return { formData };
};
