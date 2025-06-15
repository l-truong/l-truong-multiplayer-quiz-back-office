import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 

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
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    LanguageSelectorModule
  ],
  exports: [
    LoginComponent    
  ]
})
export class LoginModule { }
