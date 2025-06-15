import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';

import { LoginModule } from 'src/app/components/login/login.module';
import { CategoryModule } from './components/backoffice/category/category.module';
import { QuestionModule } from './components/backoffice/question/question.module';
import { LanguageSelectorModule } from './components/language-selector/language-selector.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,

    LoginModule,
    CategoryModule,    
    QuestionModule,
    LanguageSelectorModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
