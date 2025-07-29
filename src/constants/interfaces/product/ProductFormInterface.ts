export interface ProductForm {
  category: string;
  sub_category: string;
  product_code: string;
  product_name: string;
  price: string;
  quantity: string;
  description: string;
  sizes: string[];
  images: string[];
  thumbnail: string;
}

export interface ProductRow {
  thumbnail: string;
  productCode: string;
  productName: string;
  price: string;
  quantity: string;
  sizes: string[];
}
