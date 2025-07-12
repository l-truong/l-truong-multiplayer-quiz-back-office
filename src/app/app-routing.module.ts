import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/backoffice/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/backoffice/category/category-form/category-form.component';
import { QuestionListComponent } from './components/backoffice/question/question-list/question-list.component';
import { QuestionFormComponent } from './components/backoffice/question/question-form/question-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "categories", component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: "new-category", component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: "edit-category/:_id", component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: "questions", component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: "new-question", component: QuestionFormComponent, canActivate: [AuthGuard] },  
  { path: "edit-question/:_id", component: QuestionFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}