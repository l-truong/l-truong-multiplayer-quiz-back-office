import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { config } from 'src/app/config/backofficeConfig.config';
import { mockQuestions } from 'src/app/mocks/mockQuestions.config';
import { Question } from 'src/app/models/question';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionDemoService implements QuestionService {

  private questions: Question[] = [];

  constructor() {}

  getQuestions(): Observable<Question[]> {
    this.load();
    return of(this.questions);
  }

  getQuestion(id: string): Observable<Question | undefined> {
    const question = this.questions.find(c => c._id === id);
    return of(question);
  }

  addQuestion(question: Question): Observable<Question> {
    question._id = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    question.questionId = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    question.createdAt = new Date().toISOString();
    question.updatedAt = new Date().toISOString();
    this.questions.push(question);
    localStorage.setItem(config.localStorage.sufix + config.localStorage.questions, JSON.stringify(this.questions));      
    return of(question);
  }

  updateQuestion(id: string, updated: Question): Observable<Question> {
    const index = this.questions.findIndex(q => q._id === id);
    console.log("@@@")
    console.log("index", index)
    if (index !== -1) {
      updated.createdAt = this.questions[index].createdAt;
      updated.updatedAt = new Date().toISOString();
      console.log("updated", updated)
      this.questions[index] = updated;
      localStorage.setItem(config.localStorage.sufix + config.localStorage.questions, JSON.stringify(this.questions));              
    }
    return of(updated);
  }

  deleteQuestion(id: string): Observable<void> {
    const index = this.questions.findIndex(q => q._id === id);

    if (index !== -1) {
      this.questions.splice(index, 1);
      localStorage.setItem(config.localStorage.sufix + config.localStorage.questions, JSON.stringify(this.questions));          
    }
    return of(undefined);
  }

  private load(): void {
    const localQuestions = localStorage.getItem(config.localStorage.sufix + config.localStorage.questions);

    if (localQuestions) {
      this.questions = JSON.parse(localQuestions);
    } else {
      this.questions = mockQuestions;
      localStorage.setItem(config.localStorage.sufix + config.localStorage.questions, JSON.stringify(this.questions));  
    }
  }
}