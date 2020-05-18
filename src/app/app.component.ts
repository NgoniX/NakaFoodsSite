import { fadeAnimation } from './shared/animations/fade-int-route';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent {
  constructor() {}

  title = 'Naka Foods';
}
