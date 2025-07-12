import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { config } from 'src/app/config/backofficeConfig.config';
import { mockCategories } from 'src/app/mocks/mockCategories.config';
import { Category } from 'src/app/models/category';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDemoService implements CategoryService {

  private categories: Category[] = [];

  constructor() {}

  getCategories(): Observable<Category[]> {
    this.load();
    return of(this.categories);
  }

  getCategory(id: string): Observable<Category | undefined> {
    const category = this.categories.find(c => c._id === id);
    return of(category);
  }

  addCategory(category: Category): Observable<Category> {
    category._id = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    category.categoryId = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    category.createdAt = new Date().toISOString();
    category.updatedAt = new Date().toISOString();
    this.categories.push(category);
    localStorage.setItem(config.localStorage.sufix + config.localStorage.categories, JSON.stringify(this.categories));      
    return of(category);
  }

  updateCategory(id: string, updated: Category): Observable<Category> {
    const index = this.categories.findIndex(c => c._id === id);

    if (index !== -1) {
      updated.createdAt = this.categories[index].createdAt;
      updated.updatedAt = new Date().toISOString();
      this.categories[index] = updated;
      localStorage.setItem(config.localStorage.sufix + config.localStorage.categories, JSON.stringify(this.categories));              
    }
    return of(updated);
  }

  deleteCategory(id: string): Observable<void> {
    const index = this.categories.findIndex(c => c._id === id);

    if (index !== -1) {
      this.categories.splice(index, 1);
      localStorage.setItem(config.localStorage.sufix + config.localStorage.categories, JSON.stringify(this.categories));          
    }
    return of(undefined);
  }

  private load(): void {
    const localCategories = localStorage.getItem(config.localStorage.sufix + config.localStorage.categories);

    if (localCategories) {
      this.categories = JSON.parse(localCategories);
    } else {
      this.categories = mockCategories;
      localStorage.setItem(config.localStorage.sufix + config.localStorage.categories, JSON.stringify(this.categories));  
    }
  }
}