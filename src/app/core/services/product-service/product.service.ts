import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPageResponse } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http:HttpClient) { }

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

}
