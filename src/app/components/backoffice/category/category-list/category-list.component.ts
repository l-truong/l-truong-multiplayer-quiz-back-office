import { config } from 'src/app/config/backofficeConfig.config';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/categories/category.service';
import { LangService } from 'src/app/services/translation/lang.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  categories: Category[] = [];  
  filteredCategories: Category[] = [];  
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(
    public langService: LangService,
    private CategoryService: CategoryService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.categories = this.CategoryService.getCategories();
    this.filteredCategories = this.categories;
  }

  searchCategory(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();

    this.filteredCategories = this.categories.filter(
      category => 
        category.categoryId.toLocaleLowerCase().includes(searchTerm) ||
        category.name.toLocaleLowerCase().includes(searchTerm) ||
        category.description.toLocaleLowerCase().includes(searchTerm) ||
        category.language.toLocaleLowerCase().includes(searchTerm)
    );
  } 

  deleteCategory(categoryId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        personalizedText: this.langService.translate("categories.name")
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CategoryService.deleteCategory(categoryId);
      }
    });
  }

  getLanguage(language: string): string | null {
    return this.languages[language] || null;
  }
}
