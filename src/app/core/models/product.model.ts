export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  categoryName: string;
}

export interface ProductPageResponse {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}