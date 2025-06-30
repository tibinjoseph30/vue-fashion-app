import * as yup from 'yup';

export const orderSchema = yup.object({
  productId: yup.string().required('Product ID is required'),
  quantity: yup.number().min(1).required('Quantity is required'),
});

export const deliverySchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
});

export const paymentSchema = yup.object({
  upiRef: yup.string().required('UPI Reference ID is required'),
  screenshot: yup.mixed().required('Upload UPI payment screenshot'),
});