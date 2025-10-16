import { Component, inject, signal } from '@angular/core';
import { NormalDistributionControl } from "./normal-distribution-control/normal-distribution-control";
import { Canvas } from "./canvas/canvas";

@Component({
  selector: 'tv-root',
  imports: [NormalDistributionControl, Canvas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('transit-vis');
}
