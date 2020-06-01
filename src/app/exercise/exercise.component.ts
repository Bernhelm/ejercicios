import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UserData, Exercise } from '../interfaces';
import { SelectorService } from '../selector.service';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit, AfterViewInit {
  exercise: Exercise;
  user: UserData;
  @ViewChild('container') container: ElementRef;
  ejercicios: Array<Exercise>;
  timer: string;
  countdown: number = 120;
  difficult: number = 40;
  points: number = null;
  interval;

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
  lineChartType = 'line';

  constructor(
    private SelectorService: SelectorService,
    private UserService: UserService,
    private DataService: DataService,
    private router: Router
  ) {
    this.exercise = this.SelectorService.current;
    this.user = this.UserService.current;

    if (!this.user || !this.exercise) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.ejercicios = new Array(this.difficult)
      .fill({})
      .map((file) => this.createExercice());
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.focusFirstEmpty();
  }

  focusFirstEmpty(): boolean {
    const inputs = Array.prototype.slice.call(
      this.container.nativeElement.querySelectorAll('input')
    );
    const empty = inputs.find((input) => input.value === '');
    if (empty) {
      empty.focus();
      return true;
    } else {
      return false;
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.countdown--;
      this.formatTimer();
      if (this.countdown <= 0) {
        this.checkAll();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  formatTimer() {
    const minutes: number = Math.floor((this.countdown % (60 * 60)) / 60);
    const strMinutes: string =
      minutes < 10 ? `0${minutes}` : minutes.toString();
    const seconds: number = Math.floor(this.countdown % 60);
    const strSeconds: string =
      seconds < 10 ? `0${seconds}` : seconds.toString();
    this.timer = `${strMinutes}:${strSeconds}`;
  }

  createExercice() {
    let max = 10;
    let min = 1;
    if (this.exercise.level > 3) {
      max = 30;
    }
    let x = this.getRandomInt(min, max);
    let y = this.getRandomInt(min, max);
    let a: number, b: number;
    switch (this.exercise.operation) {
      case '+':
        a = x;
        b = y;
        break;
      case '-':
        a = Math.max(x, y);
        b = Math.min(x, y);
        break;
      case 'x':
        a = x;
        b = y;
        break;
      case '/':
        a = x * y;
        b = y;
        break;
    }

    const exercise: Exercise = {
      a: a,
      b: b,
      operation: this.exercise.operation,
      disabled: false,
      result: null,
      answer: null,
    };

    return exercise;
  }

  getRandomInt(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  focusPrevious(index): void {
    if (index - 1 > -1) {
      this.container.nativeElement.querySelectorAll('input')[index - 1].focus();
    }
  }

  focusNext(index): void {
    if (index + 1 < this.difficult) {
      this.container.nativeElement.querySelectorAll('input')[index + 1].focus();
    } else {
      if (!this.focusFirstEmpty()) {
        this.checkAll();
      }
    }
  }

  keyDown(event, index: number): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.focusNext(index);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusPrevious(index);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusNext(index);
    }
  }

  check(ejercicio): void {
    ejercicio.disabled = true;
    switch (ejercicio.operation) {
      case 'x':
        ejercicio.result = ejercicio.a * ejercicio.b === ejercicio.answer;
        if (ejercicio.answer === null) {
          ejercicio.result = null;
        }
        break;
      case '+':
        ejercicio.result = ejercicio.a + ejercicio.b === ejercicio.answer;
        if (ejercicio.answer === null) {
          ejercicio.result = null;
        }
        break;
      case '-':
        ejercicio.result = ejercicio.a - ejercicio.b === ejercicio.answer;
        if (ejercicio.answer === null) {
          ejercicio.result = null;
        }
        break;
      case '/':
        ejercicio.result = ejercicio.a / ejercicio.b === ejercicio.answer;
        if (ejercicio.answer === null) {
          ejercicio.result = null;
        }
        break;
    }
  }

  checkAll(): void {
    this.ejercicios.forEach((ejercicio) => this.check(ejercicio));
    const ok = this.ejercicios.filter((ejercicio: Exercise) => ejercicio.result)
      .length;
    const ko = this.ejercicios.filter(
      (ejercicio: Exercise) => !ejercicio.result && ejercicio.answer !== null
    ).length;
    const extraPoints = ok >= this.difficult ? this.countdown : 0;
    const points = Math.max(0, ok + extraPoints - ko);
    this.DataService.add(points);
    this.points = points;
    this.updateData(this.DataService.getData());
    clearInterval(this.interval);
  }

  updateData(data: Array<UserData>) {
    const maxNumberValues: number = data.reduce((accum, userData) => {
      return Math.max(accum, userData.data[this.exercise.level].length);
    }, 0);

    this.lineChartData = data.map((userData) => {
      let singleData = userData.data[this.exercise.level];
      const length = singleData.length;
      if (length < maxNumberValues) {
        singleData = [
          ...singleData,
          ...new Array(maxNumberValues - length).fill(singleData[length - 1]),
        ];
      }
      let dataSet: ChartDataSets = { data: singleData, label: userData.label };
      return dataSet;
    });

    this.lineChartLabels = new Array(maxNumberValues).fill('');
  }

  refresh(): void {
    this.points = null;
    this.countdown = 120;
    this.ngOnInit();
  }

  back(): void {
    this.SelectorService.setCurrent(null);
    this.router.navigate(['/selector']);
  }

  reload(): void {
    this.UserService.setCurrent(null);
    this.SelectorService.setCurrent(null);
    this.router.navigate(['/login']);
  }
}
