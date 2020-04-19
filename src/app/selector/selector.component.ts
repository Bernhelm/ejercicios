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
  exercises: Array<Exercise>;

  constructor(
    private SelectorService: SelectorService,
    private router: Router
  ) {
    this.exercises = SelectorService.exercises;
  }

  selectExercise(exercise): void {
    this.SelectorService.setCurrent(exercise);
    this.router.navigate(['/exercise']);
  }
}
