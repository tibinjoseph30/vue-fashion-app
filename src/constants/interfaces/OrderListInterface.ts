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
