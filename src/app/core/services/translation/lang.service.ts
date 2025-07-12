import { config } from 'src/app/config/backofficeConfig.config';
import { Injectable } from '@angular/core';
import { enConfig } from 'src/assets/lang/en.config';
import { frConfig } from 'src/assets/lang/fr.config';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  
  currentLang: any;

  constructor() {
    this.initializeLanguage();
  }

 initializeLanguage() {
    const storedLang = localStorage.getItem(config.localStorage.sufix + config.localStorage.language);
    if (storedLang) {
      this.setLanguage(storedLang);
    } else {
      this.setLanguage(config.otherParameters.defaultLanguage);
    }
  }

  setLanguage(lang: string) {
    if (lang === 'fr') {
      this.currentLang = frConfig;
    } else {
      this.currentLang = enConfig;
    }
    localStorage.setItem(config.localStorage.sufix + config.localStorage.language, lang);
  }

  translate(key: string): string {
    const keys = key.split('.');    
    let result = this.currentLang;

    for (const k of keys) {
      result = result[k];
      if (!result) {
        return key; 
      }
    }

    return result || key;
  }
}