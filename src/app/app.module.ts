import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  declarations: [AppComponent, ExerciseComponent, LoginComponent, SelectorComponent],
  imports: [BrowserModule, FormsModule, ChartsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
