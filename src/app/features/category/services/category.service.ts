import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeleteCategoryRequest } from '../models/delete-category-request.model';
import { GetCategoryRequest } from '../models/get-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7125/api/categories', model);
  }

  getCategory(): Observable<GetCategoryRequest[]> {
    return this.http.get<GetCategoryRequest[]>('https://localhost:7125/api/categories');
  }

  deleteCategory(model: DeleteCategoryRequest): Observable<boolean> {
    return this.http.delete<boolean>('https://localhost:7125/api/categories/'+ model.id);
  }
}
