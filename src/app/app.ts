import { Component, signal } from '@angular/core';
import { NormalDistributionControl } from "./normal-distribution-control/normal-distribution-control";

@Component({
  selector: 'app-root',
  imports: [NormalDistributionControl],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('transit-vis');
}
