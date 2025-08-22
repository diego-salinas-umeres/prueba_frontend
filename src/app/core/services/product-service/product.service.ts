import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPageResponse } from '../../models/product.model';
import { ProductCreateRequest, ProductResponse, ProductUpdateRequest } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  createProduct(newProduct: ProductCreateRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseUrl}`, newProduct)
  }

  getPaginatedProducts(
    page: number = 0,
    size: number = 25,
    name?: string,
    category?: string
  ): Observable<ProductPageResponse> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<ProductPageResponse>(`${this.baseUrl}/paginated`, { params });
  }

  updateProduct(id: number, productData: ProductUpdateRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, productData);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
