import { config } from 'src/app/config/backofficeConfig.config';
import { inputConfig } from 'src/app/config/inputConfig.config';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { SharedFunctionsService } from 'src/app/core/shared/shared-functions.service';
import { CategoryDelegatorService } from 'src/app/core/services/categories/category-delegator.service';
import { QuestionDelegatorService } from 'src/app/core/services/questions/question-delegator.service';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  categoryService: any;
  questionService: any;
  categories: Category[] = [];
  questions: Question[] = [];
  questionForm: FormGroup = new FormGroup({});    
  languages: { [key: string]: string } = config.otherParameters.languages;
  showId: boolean = false;
  
  constructor(
    public langService: LangService,
    private formBuilder: FormBuilder,
    public sharedFunctionsService: SharedFunctionsService,
    private categoryDelegator: CategoryDelegatorService,
    private questionDelegator: QuestionDelegatorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {        
    this.categoryService = this.categoryDelegator.getService();
    const localCategories = this.sharedFunctionsService.getCategoriesFromLocalStorage();
    if (localCategories) {
      this.categories = localCategories;
    } else {
      this.sharedFunctionsService.fetchCategories(this.categoryService, (data: Category[]) => {
        this.categories = data;
      });
    }
    
    this.questionService = this.questionDelegator.getService();
    const localQuestions = this.sharedFunctionsService.getQuestionsFromLocalStorage();
    if (localQuestions) {
      this.questions = localQuestions;
    } else {
      this.sharedFunctionsService.fetchQuestions(this.questionService, (data: Question[]) => {
        this.questions = data;
      });
    }   

    this.initForm();
    this.loadQuestionIfEditing();
  }

  private initForm(): void {
    this.questionForm = this.formBuilder.group({
      _id: [''],      
      questionId: [''],
      questionText: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.questionText.min), Validators.maxLength(inputConfig.questionsParameters.questionText.max)]],
      option1: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.answer.min), Validators.maxLength(inputConfig.questionsParameters.answer.max)]],
      option2: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.answer.min), Validators.maxLength(inputConfig.questionsParameters.answer.max)]],
      option3: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.answer.min), Validators.maxLength(inputConfig.questionsParameters.answer.max)]],
      option4: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.answer.min), Validators.maxLength(inputConfig.questionsParameters.answer.max)]],
      correctAnswer: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.answer.min), Validators.maxLength(inputConfig.questionsParameters.answer.max)]],
      explanation: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.explanation.min), Validators.maxLength(inputConfig.questionsParameters.explanation.max)]],
      categoryId: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.pattern(/\S+/), Validators.minLength(inputConfig.questionsParameters.imageUrl.min), Validators.maxLength(inputConfig.questionsParameters.imageUrl.max)]]
    }, { validators: [this.optionsUniqueValidator(), this.correctAnswerInOptionsValidator()] });
  }

  private loadQuestionIfEditing(): void {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id')
    if(_id){
      this.questionService.getQuestion(_id).subscribe({
        next: (question: Question) => {
          if (question) {
            this.questionForm.patchValue({
              _id: question._id,
              questionId: question.questionId,
              questionText: question.questionText,
              option1: question.options[0] || '',
              option2: question.options[1] || '',
              option3: question.options[2] || '',
              option4: question.options[3] || '',
              correctAnswer: question.correctAnswer,
              explanation: question.explanation,
              categoryId: question.categoryId,
              imageUrl: question.imageUrl
            });
          } else {
            console.error('Question not found');
          }
        },
        error: (err: any) => console.error('Failed to fetch question', err)
      });      
      this.showId = true;
    } else {
      this.showId = false;
    }
  }

  onSubmit() {
    if(this.questionForm.valid){
      const formValue: any = this.questionForm.value;       
      const _id = this.activatedRoute.snapshot.paramMap.get('_id');

      let question: any = {
        _id: formValue._id,
        questionId: formValue.questionId,
        questionText: formValue.questionText,
        options: [
          formValue.option1,
          formValue.option2,
          formValue.option3,
          formValue.option4
        ],
        correctAnswer: formValue.correctAnswer,
        explanation: formValue.explanation,
        categoryId: formValue.categoryId,
        imageUrl: formValue.imageUrl
      }

      const afterSave = () => {
        this.sharedFunctionsService.refreshQuestions(this.questionService, (data) => {
          this.questions = data;
          this.router.navigate(['/questions']);
        });
      };

      if (_id) {
        this.questionService.updateQuestion(_id, question).subscribe({
          next: afterSave,
          error: (err: any) => console.error('Failed to update question', err)
        });
      } else {
        this.questionService.addQuestion(question).subscribe({
          next: afterSave,
          error: (err: any) => console.error('Failed to add question', err)
        });
      }
    }
  }

  correctAnswerInOptionsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const option1 = group.get('option1')?.value;
      const option2 = group.get('option2')?.value;
      const option3 = group.get('option3')?.value;
      const option4 = group.get('option4')?.value;
      const correctAnswer = group.get('correctAnswer')?.value;

      const options = [option1, option2, option3, option4];
      const isValid = options.includes(correctAnswer);

      return isValid ? null : { correctAnswerNotInOptions: true };
    };
  }

  optionsUniqueValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const option1 = group.get('option1')?.value;
      const option2 = group.get('option2')?.value;
      const option3 = group.get('option3')?.value;
      const option4 = group.get('option4')?.value;

      const options = [option1, option2, option3, option4];
      const uniqueOptions = new Set(options);

      const hasDuplicates = uniqueOptions.size !== options.length;

      return hasDuplicates ? { optionsNotUnique: true } : null;
    };
  }

  getLanguage(language: string): string | null {
    return this.languages[language] || null;
  }
}