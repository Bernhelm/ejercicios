import { Injectable } from '@angular/core';
import { Exercise } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class SelectorService {
  current: Exercise;
  exerciseList: Array<Exercise>;

  initialData: Array<Exercise> = [
    { name: 'Suma', operation: '+', level: 0 },
    { name: 'Resta', operation: '-', level: 1 },
    { name: 'Multiplicacion', operation: 'x', level: 2 },
  ];

  constructor() {
    this.current = null;
    this.exerciseList = this.initialData;
  }

  setCurrent(current: Exercise) {
    this.current = current;
  }

  get exercise(): Exercise {
    return this.current;
  }

  get exercises(): Array<Exercise> {
    return this.exerciseList;
  }
}
