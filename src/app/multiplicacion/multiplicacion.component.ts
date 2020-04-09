import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Exercise } from '../interfaces';

@Component({
  selector: 'app-multiplicacion',
  templateUrl: './multiplicacion.component.html',
  styleUrls: ['./multiplicacion.component.scss'],
})
export class MultiplicacionComponent implements OnInit {
  @Output() result = new EventEmitter<number>();
  @ViewChild('container') container: ElementRef;
  ejercicios: Array<Exercise>;
  timer: string;
  countdown: number = 120;
  difficult: number = 40;
  interval;

  constructor() {
    this.ejercicios = new Array(this.difficult)
      .fill({})
      .map((file) => this.createExercice());
    this.startTimer();
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
    const exercise: Exercise = {
      a: this.getRandomInt(),
      b: this.getRandomInt(),
      operation: 'x',
      disabled: false,
      result: null,
      answer: null,
    };

    return exercise;
  }

  getRandomInt(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnInit(): void {}

  keyDown(event, index: number): void {
    if (event.key === 'Enter') {
      if (index + 1 < this.difficult) {
        this.container.nativeElement
          .querySelectorAll('input')
          [index + 1].focus();
      } else {
        this.checkAll();
      }
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
    }
  }

  checkAll(): void {
    this.ejercicios.forEach((ejercicio) => this.check(ejercicio));
    const points =
      this.ejercicios.filter((ejercicio: Exercise) => ejercicio.result).length *
        1 -
      this.ejercicios.filter(
        (ejercicio: Exercise) => !ejercicio.result && ejercicio.answer !== null
      ).length *
        1 +
      Math.max(
        0,
        Math.floor(this.countdown / 10) -
          this.ejercicios.filter(
            (ejercicio: Exercise) => ejercicio.answer === null
          ).length
      );
    this.result.emit(points);
    clearInterval(this.interval);
  }
}
