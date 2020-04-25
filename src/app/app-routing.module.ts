import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectorComponent } from './selector/selector.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ChartComponent } from './chart/chart.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
