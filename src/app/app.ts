import { Component, signal } from '@angular/core';
import { Canvas } from "./canvas/canvas";
import { Normal2DDistributionControl } from './normal-2-d-distribution-control/normal-2-d-distribution-control';

@Component({
  selector: 'tv-root',
  imports: [Normal2DDistributionControl, Canvas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('transit-vis');
    protected color_1 = {
      red: 0,
      blue: 1,
      green: 0,
      alpha: .5
    }
    protected color_2 = {
      red: 1,
      blue: 0,
      green: 0,
      alpha: .5
    }
}
