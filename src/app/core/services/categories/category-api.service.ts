import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { config } from 'src/app/config/backofficeConfig.config';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService implements CategoryService {

  private apiUrl = config.api.baseUrl + '/categories';  

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.getHeaders() });
  }

  updateCategory(id: string, updatedCategory: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${id}`, updatedCategory, { headers: this.getHeaders() });
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}