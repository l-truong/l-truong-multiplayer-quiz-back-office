import { config } from 'src/app/config/backofficeConfig.config';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { CategoryService } from 'src/app/services/categories/category.service';
import { QuestionService } from 'src/app/services/questions/question.service';
import { LangService } from 'src/app/services/translation/lang.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  categories: Category[] = [];
  questions: Question[] = [];
  filteredQuestions: Question[] = [];
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(
    public langService: LangService,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.questions = this.questionService.getQuestions();
    this.filteredQuestions = this.questions;
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

  deleteQuestion(questionId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        personalizedText: this.langService.translate("questions.name")
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionService.deleteQuestion(questionId);
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
