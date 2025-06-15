import { config } from 'src/app/config/backofficeConfig.config';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { CategoryService } from 'src/app/services/categories/category.service';
import { QuestionService } from 'src/app/services/questions/question.service';
import { LangService } from 'src/app/services/translation/lang.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  categories: Category[] = [];
  questionForm: FormGroup = new FormGroup({});    
  languages: { [key: string]: string } = config.otherParameters.languages;

  constructor(
    public langService: LangService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {    
    this.categories = this.categoryService.getCategories();

    this.questionForm = this.formBuilder.group({
      questionText: ['', [Validators.required, Validators.pattern(/\S+/)]],
      option1: ['', [Validators.required, Validators.pattern(/\S+/)]],
      option2: ['', [Validators.required, Validators.pattern(/\S+/)]],
      option3: ['', [Validators.required, Validators.pattern(/\S+/)]],
      option4: ['', [Validators.required, Validators.pattern(/\S+/)]],
      correctAnswer: ['', [Validators.required, Validators.pattern(/\S+/)]],
      explanation: ['', [Validators.required, Validators.pattern(/\S+/)]],
      categoryId: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern(/\S+/)]]
    }, { validators: [this.optionsUniqueValidator(), this.correctAnswerInOptionsValidator()] });

    let questionId = this.activatedRoute.snapshot.paramMap.get('questionId')
    if(questionId){
      let question = this.questionService.getQuestion(questionId)
      if (question) {
        this.questionForm.patchValue({
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
      }
    }
  }

  onSubmit() {
    if(this.questionForm.valid){
      const formValue = this.questionForm.value;            
      let question: Question = {
        questionId: '',
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

      let questionId = this.activatedRoute.snapshot.paramMap.get('questionId');
      if(questionId){
        this.questionService.updateQuestion(questionId, question);
      } else {
        this.questionService.addQuestion(question);
      }

      this.router.navigate(['/questions']);
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