import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-multiplicacion',
  templateUrl: './multiplicacion.component.html',
  styleUrls: ['./multiplicacion.component.scss'],
})
export class MultiplicacionComponent implements OnInit {
  @Output() result = new EventEmitter<number>();
  ejercicios: Array<Exercise>;
  timer: string;
  countdown: number = 120;

  constructor() {
    this.ejercicios = new Array(30)
      .fill({})
      .map((file) => this.createExercice());
    this.startTimer();
  }

  startTimer() {
    let interval = setInterval(() => {
      this.countdown--;
      this.formatTimer();
      if (this.countdown <= 0) {
        this.checkAll();
        clearInterval(interval);
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
        1;
    this.result.emit(points);
  }
}
