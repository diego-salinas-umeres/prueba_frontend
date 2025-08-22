export interface ProductBase {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface Product extends ProductBase {
  id: number;
  categoryId: number;
  categoryName: string;
}

export interface ProductCreateRequest extends ProductBase {
  categoryId: number;
}

export interface ProductResponse extends ProductBase {
  id: number;
  categoryName: string;
}

export interface ProductPaginated extends ProductResponse { }

export interface ProductPageResponse {
  products: ProductPaginated[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductUpdateRequest {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: number;
}