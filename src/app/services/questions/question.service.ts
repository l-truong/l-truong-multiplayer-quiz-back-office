import { config } from 'src/app/config/backofficeConfig.config';
import { mockQuestions } from 'src/app/mocks/mockQuestions.config';
import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[] = [];

  constructor() {    
    let savedQuestions = localStorage.getItem(config.localStorage.questions);    
    if (!savedQuestions) {
      this.questions = mockQuestions;
      localStorage.setItem(config.localStorage.questions, JSON.stringify(this.questions));
    } else {
      this.questions = JSON.parse(savedQuestions);
    }
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  getQuestion(questionId: string): Question | undefined {
    return this.questions.find(res => res.questionId === questionId);
  }

  addQuestion(question: Question): void {
    question.questionId = Date.now().toString();
    this.questions.push(question);
    localStorage.setItem(config.localStorage.questions, JSON.stringify(this.questions));
  }

  deleteQuestion(questionId: string): void {
    let index = this.questions.findIndex(res => res.questionId === questionId);
    this.questions.splice(index, 1)
    localStorage.setItem(config.localStorage.questions, JSON.stringify(this.questions));
  }

  updateQuestion(questionId: string, updatedQuestion: Question): void {
    let index = this.questions.findIndex(res => res.questionId === questionId);
    updatedQuestion.questionId = questionId;
    this.questions[index] = updatedQuestion;
    localStorage.setItem(config.localStorage.questions, JSON.stringify(this.questions));
  }  
}