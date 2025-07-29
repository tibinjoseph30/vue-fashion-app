interface OrderDetails {
  productCode: string;
  productSize: string;
}

interface DeliveryDetails {
  firstName: string;
  LastName: string;
  phone: string;
  email: string;
  address: string;
  pinCode: string;
}

interface PaymentDetails {
  transactionId: string;
}

export interface OrderForm {
  order: OrderDetails;
  delivery: DeliveryDetails;
  payment: PaymentDetails;
}

export interface OrderRow {
  id: string;
  customer: string;
  product: string;
  address: string;
  contact: string;
  transactionId: string;
  createdAt: string;
  status?: string;
}
