export interface OrderDetails {
  productId: string;
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  address: string;
  phone: string;
}

export interface PaymentDetails {
  upiRef: string;
  screenshot: File | null;
}

export interface OrderForm {
  order: OrderDetails;
  delivery: DeliveryDetails;
  payment: PaymentDetails;
}