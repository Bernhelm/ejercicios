import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserData } from './interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'examen';
  points: number = null;
  user: string = null;
  users: Array<string> = ['Papa', 'Lia', 'David'];
  storage: Array<Object>;

  lineChartData: ChartDataSets[] = [];

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
  lineChartType = 'line';

  constructor() {
    this.storage =
      JSON.parse(localStorage.getItem('data')) ||
      this.users.reduce((accum, user) => {
        let newUser = {};
        newUser[user] = [];
        return Object.assign({}, accum, newUser);
      }, {});
    this.updateData();
  }

  reload() {
    this.user = null;
    this.points = null;
  }

  updateResult(points: number) {
    this.points = points;
    this.updateStorage();
  }

  updateStorage() {
    if (!this.storage[this.user]) {
      this.storage[this.user] = [];
    }
    this.storage[this.user] = [...this.storage[this.user], this.points];
    localStorage.setItem('data', JSON.stringify(this.storage));
    this.updateData();
  }

  updateData() {
    this.lineChartData = Object.keys(this.storage).map((user) => {
      const userData: UserData = {
        data: this.storage[user],
        label: user,
      };
      return userData;
    });

    const maxNumberValues: number = Object.keys(this.storage).reduce(
      (accum, user) => {
        return Math.max(accum, this.storage[user].length);
      },
      0
    );

    this.lineChartLabels = new Array(maxNumberValues).fill('');
  }

  selectUser(user: string) {
    this.user = user;
  }
}
