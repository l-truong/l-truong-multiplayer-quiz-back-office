import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { LoginComponent } from './login.component';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,    
    RouterModule,
    FormsModule,
    ReactiveFormsModule,    
    MaterialModule,
    LanguageSelectorModule
  ],
  exports: [
    LoginComponent    
  ]
})
export class LoginModule {}