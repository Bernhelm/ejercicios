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
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  lineChartOptionsLine = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0, // minimum value will be 0.
            suggestedMax: 100, // minimum value will be 0.
          },
        },
      ],
    },
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

  charts;

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

    this.charts = exercises.map((exercise) => {
      const chart = {
        name: exercise.name,
        data: [],
        labels: [],
      };

      const maxNumberValues: number = data.reduce((accum, userData) => {
        return Math.max(accum, userData.data[exercise.level].length);
      }, 0);

      chart.data = data.map((userData) => {
        let singleData = userData.data[exercise.level];
        const length = singleData.length;
        if (length < maxNumberValues) {
          singleData = [
            ...singleData,
            ...new Array(maxNumberValues - length).fill(singleData[length - 1]),
          ];
        }
        let dataSet: ChartDataSets = {
          data: singleData,
          label: userData.label,
        };
        return dataSet;
      });

      chart.labels = new Array(maxNumberValues).fill('');

      return chart;
    });
  }
}
