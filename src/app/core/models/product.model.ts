// Base de un producto
export interface ProductBase {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

// Request para crear o actualizar un producto
export interface ProductCreateRequest extends ProductBase {
  categoryId: number;
}

// Respuesta de un producto con id y nombre de categoría
export interface ProductResponse extends ProductBase {
  id: number;
  categoryName: string;
}

// Producto paginado (puede ser opcional el id)
export interface ProductPaginated extends ProductResponse {}

// Respuesta de paginación
export interface ProductPageResponse {
  products: ProductPaginated[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}