export interface OrderSection {
  productCode: string;
  productSize: string;
}

export interface DeliverySection {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  address: string;
  street: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
}

export interface PaymentSection {
  paymentScreenshot: string;
  referenceID: string;
}

export interface OrderForm {
  order: OrderSection;
  delivery: DeliverySection;
  payment: PaymentSection;
}
