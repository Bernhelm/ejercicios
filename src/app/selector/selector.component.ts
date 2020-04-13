import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from '../interfaces';
import { SelectorService } from '../selector.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  exercise: Exercise = null;
  exercises: Array<Exercise> = [
    { name: 'Suma', operation: '+', level: 0 },
    { name: 'Resta', operation: '-', level: 1 },
    { name: 'Multiplicacion', operation: 'x', level: 2 },
  ];

  constructor(
    private SelectorService: SelectorService,
    private router: Router
  ) {}

  selectExercise(exercise): void {
    this.SelectorService.setCurrent(exercise);
    this.router.navigate(['/exercise']);
  }
}
