import { config } from 'src/app/config/backofficeConfig.config';
import { inputConfig } from 'src/app/config/inputConfig.config';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { CategoryDelegatorService } from 'src/app/core/services/categories/category-delegator.service';
import { LangService } from 'src/app/core/services/translation/lang.service';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryService: any;
  categories: Category[] = []; 
  categoryForm: FormGroup = new FormGroup({});
  languages: { [key: string]: string } = config.otherParameters.languages;
  showId: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,    
    private formBuilder: FormBuilder,    
    private categoryDelegator: CategoryDelegatorService,
    public sharedFunctionsService: SharedFunctionsService,
    public langService: LangService    
  ) {}

  ngOnInit(): void {
    this.categoryService = this.categoryDelegator.getService();    
    const localCategories = this.sharedFunctionsService.getCategoriesFromLocalStorage();
    if (localCategories) {
      this.categories = localCategories;
    } else {
      this.sharedFunctionsService.refreshCategories(this.categoryService, (data) => {
        this.categories = data;
      });
    }
    
    this.initForm();
    this.loadCategoryIfEditing();
  }

  private initForm(): void {
    this.categoryForm = this.formBuilder.group({
      _id: [''],
      categoryId: [''],
      name: ['', [
        Validators.required, 
        Validators.pattern(/\S+/), 
        Validators.minLength(inputConfig.categoryParameters.name.min), 
        Validators.maxLength(inputConfig.categoryParameters.name.max)
      ]],
      description: ['', [
        Validators.required, 
        Validators.pattern(/\S+/), 
        Validators.pattern(/\S+/), 
        Validators.minLength(inputConfig.categoryParameters.description.min), 
        Validators.maxLength(inputConfig.categoryParameters.description.max)
      ]],
      language: ['', [Validators.required]]
    });
  }

  private loadCategoryIfEditing(): void {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id');
    if (_id) {
      this.categoryService.getCategory(_id).subscribe({
        next: (category: Category) => {
          if (category) {
            this.categoryForm.patchValue(category);
          } else {
            console.error('Category not found');
          }
        },
        error: (err: any) => console.error('Failed to fetch category', err)
      });
      this.showId = true;
    } else {
      this.showId = false;
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      const _id = this.activatedRoute.snapshot.paramMap.get('_id');

      const afterSave = () => {
        this.sharedFunctionsService.refreshCategories(this.categoryService, (data) => {
          this.categories = data;
          this.router.navigate(['/categories']);
        });
      };

      if (_id) {
        this.categoryService.updateCategory(_id, category).subscribe({
          next: afterSave,
          error: (err: any) => console.error('Failed to update category', err)
        });
      } else {
        this.categoryService.addCategory(category).subscribe({
          next: afterSave,
          error: (err: any) => console.error('Failed to add category', err)
        });
      }
    }
  }

  objectKeys(obj: { [key: string]: string }) {
    return Object.keys(obj);
  }
}