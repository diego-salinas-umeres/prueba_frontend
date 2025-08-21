export interface Category {
  id: number;
  name: string;
}

export interface CategoryCreateRequest {
  name: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}