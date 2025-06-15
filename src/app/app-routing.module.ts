import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/backoffice/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/backoffice/category/category-form/category-form.component';
import { QuestionListComponent } from './components/backoffice/question/question-list/question-list.component';
import { QuestionFormComponent } from './components/backoffice/question/question-form/question-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "categories", component: CategoryListComponent },
  { path: "new-category", component: CategoryFormComponent },
  { path: "edit-category/:categoryId", component: CategoryFormComponent },
  { path: "questions", component: QuestionListComponent },
  { path: "new-question", component: QuestionFormComponent },  
  { path: "edit-question/:questionId", component: QuestionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}