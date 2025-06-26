import type { OrderForm } from "./orderFormInterface";

export const defaultOrderFormData: OrderForm = {
  order: {
    productCode: "",
    productSize: "",
  },
  delivery: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address: "",
    street: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
  },
  payment: {
    paymentScreenshot: "",
    referenceID: "",
  },
};
