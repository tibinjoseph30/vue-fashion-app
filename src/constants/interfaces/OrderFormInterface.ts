export interface OrderDetails {
  productCode: string;
  productSize: string;
}

export interface DeliveryDetails {
  firstName: string;
  LastName: string;
  phone: string;
  email: string;
  address: string;
  pinCode: string;
}

export interface PaymentDetails {
  transactionId: string;
}

export interface OrderForm {
  order: OrderDetails;
  delivery: DeliveryDetails;
  payment: PaymentDetails;
}
