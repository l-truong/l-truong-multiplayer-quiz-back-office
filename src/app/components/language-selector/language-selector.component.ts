import { config } from 'src/app/config/backofficeConfig.config';
import { Component } from '@angular/core';
import { LangService } from 'src/app/core/services/translation/lang.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  
  currentLanguage: string;

  constructor(public langService: LangService) {
    this.currentLanguage = localStorage.getItem(config.localStorage.sufix + config.localStorage.language) || config.otherParameters.defaultLanguage;
  }
  
  switchLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.langService.setLanguage(selectedLanguage);
    this.currentLanguage = selectedLanguage;
  }
}