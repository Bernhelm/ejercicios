import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'examen';
  points: number = null;

  updateResult(points: number) {
    this.points = points;
  }
}
