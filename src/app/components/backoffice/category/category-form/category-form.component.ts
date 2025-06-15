import { config } from 'src/app/config/backofficeConfig.config';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categories/category.service';
import { LangService } from 'src/app/services/translation/lang.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({});
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(
    public langService: LangService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      description: ['', [Validators.required, Validators.pattern(/\S+/)]],
      language: ['', [Validators.required]],
    })

    let categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
    if(categoryId){
      let category = this.categoryService.getCategory(categoryId);
      if(category) { 
        this.categoryForm.patchValue(category);
      }
    }
  }

  onSubmit() {
    if(this.categoryForm.valid){
      let category: Category = this.categoryForm.value;

      let categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');
      if(categoryId){
        this.categoryService.updateCategory(categoryId, category);
      } else {
        this.categoryService.addCategory(category);
      }

      this.router.navigate(['/categories']);
    }
  }

  objectKeys(obj: { [key: string]: string }) {
    return Object.keys(obj);
  }

  getLanguage(language: string): string {
    return this.languages[language] || 'No language found';
  }
}