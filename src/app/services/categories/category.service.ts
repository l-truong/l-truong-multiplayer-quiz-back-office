import { config } from 'src/app/config/backofficeConfig.config';
import { mockCategories } from 'src/app/mocks/mockCategories.config';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];

  constructor(){
    let savedCategories = localStorage.getItem(config.localStorage.categories);

    if (!savedCategories) {
      this.categories = mockCategories;
      localStorage.setItem(config.localStorage.categories, JSON.stringify(this.categories));
    } else {
      this.categories = JSON.parse(savedCategories);
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(categoryId: string): Category | undefined {
    return this.categories.find(res => res.categoryId === categoryId);
  }

  addCategory(category: Category): void {
    category.categoryId = Date.now().toString();
    this.categories.push(category);
    localStorage.setItem(config.localStorage.categories, JSON.stringify(this.categories));
  }

  deleteCategory(categoryId: string): void {
    let index = this.categories.findIndex(res => res.categoryId === categoryId);
    this.categories.splice(index,1)
    localStorage.setItem(config.localStorage.categories, JSON.stringify(this.categories));
  }

  updateCategory(categoryId: string, updatedCategory: Category): void {
    let index = this.categories.findIndex(res => res.categoryId === categoryId);
    updatedCategory.categoryId = categoryId;
    this.categories[index] = updatedCategory;
    localStorage.setItem(config.localStorage.categories, JSON.stringify(this.categories));
  }  
}