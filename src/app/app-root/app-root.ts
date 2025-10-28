import { Component, signal } from '@angular/core';
import { DistroProtoApp } from '../distro-proto-app/distro-proto-app';
import { RoadProtoApp } from "../road-proto-app/road-proto-app";

@Component({
  selector: 'tv-app-root',
  imports: [RoadProtoApp],
  templateUrl: './app-root.html',
  styleUrl: './app-root.css'
})
export class AppRoot {
    protected readonly title = signal('transit-vis');
}
