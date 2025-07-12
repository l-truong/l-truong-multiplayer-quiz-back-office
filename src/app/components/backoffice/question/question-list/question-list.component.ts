import { config } from 'src/app/config/backofficeConfig.config';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { CategoryDelegatorService } from 'src/app/core/services/categories/category-delegator.service';
import { QuestionDelegatorService } from 'src/app/core/services/questions/question-delegator.service';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  categoryService: any;
  questionService: any;
  isLoading: boolean = true;
  categories: Category[] = [];
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(
    public langService: LangService,    
    public sharedFunctionsService: SharedFunctionsService,
    private categoryDelegator: CategoryDelegatorService,
    private questionDelegator: QuestionDelegatorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoryService = this.categoryDelegator.getService();
    this.questionService = this.questionDelegator.getService();

    const localCategories = this.sharedFunctionsService.getCategoriesFromLocalStorage();
    if (localCategories) {
      this.categories = localCategories;
    } else {
      this.sharedFunctionsService.fetchCategories(this.categoryService, (data: Category[]) => {
        this.categories = data;
      });
    }

    const localQuestions = this.sharedFunctionsService.getQuestionsFromLocalStorage();
    if (localQuestions) {
      this.questions = localQuestions;
      this.filteredQuestions = localQuestions;
      this.isLoading = false;
    } else {
      this.sharedFunctionsService.fetchQuestions(this.questionService, (data: Question[]) => {
        this.questions = data;
        this.filteredQuestions = data;
        this.isLoading = false;
      });
    }
  }

  searchQuestions(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();

    this.filteredQuestions = this.questions.filter((question) => {
      const category = this.getCategory(question.categoryId);
      const language = category ? this.getLanguage(category.language) : null;

      return (
        question.questionId.toLocaleLowerCase().includes(searchTerm) ||
        question.questionText.toLocaleLowerCase().includes(searchTerm) ||
        question.options.some((option) => option.toLocaleLowerCase().includes(searchTerm)) ||
        question.correctAnswer.toLocaleLowerCase().includes(searchTerm) ||
        question.explanation.toLocaleLowerCase().includes(searchTerm) ||
        (category?.name?.toLocaleLowerCase().includes(searchTerm)) ||
        (language?.toLocaleLowerCase().includes(searchTerm))
      );
    });
  } 

  deleteQuestion(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        personalizedText: this.langService.translate("questions.name")
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.questionService.deleteQuestion(id).subscribe({
          next: () => {
            this.sharedFunctionsService.fetchQuestions(this.questionService, (data: Question[]) => {             
              this.questions = data;
              this.filteredQuestions = data;
              this.isLoading = false;
            });
          },
          error: (err: any) => console.error('Error deleting category', err)
        });
      }
    });
  }

  getCategory(categoryId: string): Category | null {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category : null;
  }

  getLanguage(language: string): string | null {
    return this.languages[language] || null;
  }
}
