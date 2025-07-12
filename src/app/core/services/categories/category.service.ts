import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

export abstract class CategoryService {
  abstract getCategories(): Observable<Category[]>;
  abstract getCategory(id: string): Observable<Category | undefined>;
  abstract addCategory(category: Category): Observable<Category>;  
  abstract updateCategory(id: string, category: Category): Observable<Category>;
  abstract deleteCategory(id: string): Observable<void>;
}