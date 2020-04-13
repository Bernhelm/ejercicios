import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectorComponent } from './selector/selector.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'selector', component: SelectorComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
