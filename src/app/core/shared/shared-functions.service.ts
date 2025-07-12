import { config } from 'src/app/config/backofficeConfig.config';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  
  constructor() {}

  getCategoriesFromLocalStorage(): any[] | null {
    const savedCategories = localStorage.getItem(config.localStorage.sufix + config.localStorage.categories);
    return savedCategories ? JSON.parse(savedCategories) : null;
  }
  
  fetchCategories(categoryService: any, callback: (data: any) => void, onError?: (err: any) => void): void {
    categoryService.getCategories().subscribe({
      next: (data: any) => {
        localStorage.setItem(
          config.localStorage.sufix + config.localStorage.categories,
          JSON.stringify(data)
        );
        callback(data);
      },
      error: (err: any) => {
        console.error('Error fetching categories', err);
        if (onError) onError(err);
      }
    });
  }

  refreshCategories(categoryService: any, callback?: (data: Category[]) => void): void {
    categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        localStorage.setItem(
          config.localStorage.sufix + config.localStorage.categories,
          JSON.stringify(data)
        );  
        if (callback) callback(data);
      },
      error: (err: any) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  getQuestionsFromLocalStorage(): any[] | null {
    const savedQuestions = localStorage.getItem(config.localStorage.sufix + config.localStorage.questions);
    return savedQuestions ? JSON.parse(savedQuestions) : null;
  }

  fetchQuestions(questionService: any, callback: (data: any) => void, onError?: (err: any) => void): void {
    questionService.getQuestions().subscribe({
      next: (data: any) => {
        localStorage.setItem(
          config.localStorage.sufix + config.localStorage.questions,
          JSON.stringify(data)
        );
        callback(data);
      },
      error: (err: any) => {
        console.error('Error fetching questions', err);
        if (onError) onError(err);
      }
    });
  }

  refreshQuestions(questionService: any, callback?: (data: Question[]) => void): void {
    questionService.getQuestions().subscribe({
      next: (data: Question[]) => {
        localStorage.setItem(
          config.localStorage.sufix + config.localStorage.questions,
          JSON.stringify(data)
        );  
        if (callback) callback(data);
      },
      error: (err: any) => {
        console.error('Error fetching questions', err);
      }
    });
  }

  clearLocalStorage(): void {
    localStorage.removeItem(config.localStorage.sufix + config.localStorage.accessToken);
    localStorage.removeItem(config.localStorage.sufix + config.localStorage.refreshToken);
    localStorage.removeItem(config.localStorage.sufix + config.localStorage.categories);
    localStorage.removeItem(config.localStorage.sufix + config.localStorage.questions);
  }

  getLanguage(language: string, languages: { [key: string]: string }): string | null {
    return languages[language] || null;
  }
}