import { config } from 'src/app/config/backofficeConfig.config';
import { Injectable } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import { CategoryDemoService } from './category-demo.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDelegatorService {

  constructor(
    private apiService: CategoryApiService,
    private demoService: CategoryDemoService
  ) {}

  getService() {
    const accessToken = localStorage.getItem(config.localStorage.sufix + config.localStorage.accessToken);
    if (accessToken === config.otherParameters.demo.demoAccessToken) {      
      return this.demoService;
    }
    return this.apiService;
  }
}