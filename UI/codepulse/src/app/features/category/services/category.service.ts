import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../add-category/add-category-request.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Category } from '../add-category/category-request.models';
import { UpdateCategoryRequest } from '../edit-category.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://localhost:7063/api/Category/';

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl+'GetCategories');
  }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(this.baseUrl+'AddCategory',model);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl+'GetCategoryById'}?id=${id}`);
  }

  updateCategory(category: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(this.baseUrl+'UpdateCategory', category);
  }

  deleteCategory(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl+'DeleteCategory'}?id=${id}`);
  }

}
