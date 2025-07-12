import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageSelectorComponent } from './language-selector.component';
import { RouterModule } from '@angular/router'
import { MaterialModule } from 'src/app/material-module';

@NgModule({
  declarations: [
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    LanguageSelectorComponent
  ]
})
export class LanguageSelectorModule {}