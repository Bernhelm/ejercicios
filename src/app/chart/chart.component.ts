import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectorService } from '../selector.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  lineChartData: ChartDataSets[];

  lineChartLabels: Label[];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'radar';

  constructor(
    private DataService: DataService,
    private SelectorService: SelectorService
  ) {
    const exercises = this.SelectorService.exercises;
    this.lineChartLabels = exercises.map((exercise) => exercise.name);
    const data = this.DataService.getData();
    this.lineChartData = data.map((userData) => {
      const data = userData.data.map((row) => row.slice(-1).pop());
      return { data, label: userData.label };
    });
  }
}
