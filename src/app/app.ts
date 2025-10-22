import { Component, signal } from '@angular/core';
import { Canvas } from "./canvas/canvas";
import { Normal2DDistributionControl } from './distribution-control/normal-2-d-distribution-control/normal-2-d-distribution-control';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../GLOBALS';
import { TransitMap } from '../model/transitmap';
import { NormalDistributionControl } from './distribution-control/normal-distribution-control/normal-distribution-control';

@Component({
  selector: 'tv-root',
  imports: [NormalDistributionControl, Normal2DDistributionControl, Canvas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('transit-vis');
    protected canvasWidth = GLOBAL_canvasWidth
    protected canvasHeight = GLOBAL_canvasHeight
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

    protected transitMap = new TransitMap()
}
