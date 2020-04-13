import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserData, Exercise } from './interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'examen';
  points: number = null;
  user: UserData = null;
  users: Array<UserData>;
  exercise: Exercise = null;
  exercises: Array<Exercise>;

  operation: string = null;

  // lineChartData: Array<ChartDataSets[]> = new Array(this.exercises.length).fill(
  //   []
  // );

  // lineChartLabels: Array<Label[]> = new Array(this.exercises.length).fill([]);

  // lineChartOptions = {
  //   responsive: true,
  // };

  // lineChartColors: Color[] = [
  //   {
  //     borderColor: 'black',
  //     backgroundColor: 'rgba(255,255,0,0.28)',
  //   },
  // ];

  // lineChartLegend = true;
  // lineChartPlugins = [];
  // lineChartType = 'line';

  constructor() {}
}
