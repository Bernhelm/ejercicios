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
  users: Array<string> = ['Papa', 'Lia', 'David'];
  storage: Array<Object>;
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

  constructor() {
    this.storage =
      JSON.parse(localStorage.getItem('data')) ||
      this.users.reduce((accum, user) => {
        let newUser = {};
        newUser[user] = [[], [], []];
        return Object.assign({}, accum, newUser);
      }, {});
    // this.updateData();
  }

  reload() {
    this.user = null;
    this.exercise = null;
    this.operation = null;
    this.points = null;
  }

  updateResult(points: number) {
    this.points = points;
    this.updateStorage();
  }

  updateStorage() {
    if (!this.storage[this.user.id]) {
      this.storage[this.user.id] = [[], [], []];
    }
    this.storage[this.user.id][this.exercise.level] = [
      ...this.storage[this.user.id][this.exercise.level],
      this.points,
    ];
    localStorage.setItem('data', JSON.stringify(this.storage));
    // this.updateData();
  }

  updateData() {
    this.exercises.map((element, index) => {
      const maxNumberValues: number = Object.keys(this.storage).reduce(
        (accum, user) => {
          return Math.max(accum, this.storage[user][index].length);
        },
        0
      );

      // this.lineChartData[index] = Object.keys(this.storage)
      //   .map((user) => {
      //     const userData: UserData = {
      //       data: this.storage[user][index],
      //       label: user,
      //     };
      //     return userData;
      //   })
      //   .map((value) => {
      //     const length = value.data.length;
      //     if (length < maxNumberValues) {
      //       value.data = [
      //         ...value.data,
      //         ...new Array(maxNumberValues - length).fill(
      //           value.data[length - 1]
      //         ),
      //       ];
      //     }
      //     return value;
      //   });

      // this.lineChartLabels[index] = new Array(maxNumberValues).fill('');
    });
  }

  selectUser(user: UserData) {
    this.user = user;
  }

  selectExercise(exercise: Exercise) {
    this.exercise = exercise;
    this.updateData();
  }
}
