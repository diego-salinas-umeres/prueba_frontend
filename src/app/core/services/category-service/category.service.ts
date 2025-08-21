import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoryCreateRequest } from '../../models/category.model';
import { CategoryResponse } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.apiUrl}/categories`

  constructor(
    private http: HttpClient
  ) { }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  createCategory(request: CategoryCreateRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(this.baseUrl, request);
  }

}
