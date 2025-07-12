import { config } from 'src/app/config/backofficeConfig.config';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Category } from 'src/app/models/category';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { CategoryDelegatorService } from 'src/app/core/services/categories/category-delegator.service';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  categoryService: any;
  isLoading: boolean = true;
  categories: Category[] = [];  
  filteredCategories: Category[] = [];  
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(        
    private dialog: MatDialog,
    private categoryDelegator: CategoryDelegatorService,
    public sharedFunctionsService: SharedFunctionsService,
    public langService: LangService
  ) {}

  ngOnInit(): void {
    this.categoryService = this.categoryDelegator.getService();

    const localCategories = this.sharedFunctionsService.getCategoriesFromLocalStorage();

    if (localCategories) {
      this.categories = localCategories;
      this.filteredCategories = localCategories;
      this.isLoading = false;
    } else {
      this.sharedFunctionsService.fetchCategories(this.categoryService, (data: Category[]) => {
        this.categories = data;
        this.filteredCategories = data;
        this.isLoading = false;
      });
    }
  }

  searchCategory(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLocaleLowerCase();

    this.filteredCategories = this.categories.filter(category =>
      category.categoryId.toLocaleLowerCase().includes(searchTerm) ||
      category.name.toLocaleLowerCase().includes(searchTerm) ||
      category.description.toLocaleLowerCase().includes(searchTerm) ||
      category.language.toLocaleLowerCase().includes(searchTerm)
    );
  } 

  deleteCategory(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { personalizedText: this.langService.translate("categories.name") }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.sharedFunctionsService.fetchCategories(this.categoryService, (data: Category[]) => {
              this.categories = data;
              this.filteredCategories = data;
              this.isLoading = false;
            });
          },
          error: (err: any) => console.error('Error deleting category', err)
        });
      }
    });
  }
}
