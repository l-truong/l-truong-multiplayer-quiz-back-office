import { config } from 'src/app/config/backofficeConfig.config';
import { Injectable } from '@angular/core';
import { QuestionApiService } from './question-api.service';
import { QuestionDemoService } from './question-demo.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionDelegatorService {

  constructor(
    private apiService: QuestionApiService,
    private demoService: QuestionDemoService
  ) {}

  getService() {
    const accessToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
    if (accessToken === config.otherParameters.demo.demoAccessToken) {      
      return this.demoService;
    }
    return this.apiService;
  }
}