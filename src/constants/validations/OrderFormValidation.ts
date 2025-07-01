import * as yup from "yup";

export const orderSchema = yup.object({
  productCode: yup.string().required("Product Code is required"),
  productSize: yup.string().required("Size is required"),
});

export const deliverySchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: yup.string().required("Email is required"),
  address: yup.string().required("Address is required"),
  pinCode: yup.string().required("Pincode is required"),
});
