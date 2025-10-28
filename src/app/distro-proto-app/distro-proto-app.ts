import { Component, inject } from '@angular/core';
import { Canvas } from "../canvas/canvas";
import { Normal2DDistributionControl } from '../distribution-control/normal-2-d-distribution-control/normal-2-d-distribution-control';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { TransitMap } from '../../model/transitmap';
import { Renderer } from '../../render/renderer';
import { Distribution } from '../../model/distribution';

@Component({
  selector: 'tv-distro-proto-app',
  imports: [Normal2DDistributionControl, Canvas],
  templateUrl: './distro-proto-app.html',
  styleUrl: './distro-proto-app.css'
})
export class DistroProtoApp {
    protected canvasWidth = GLOBAL_canvasWidth
    protected canvasHeight = GLOBAL_canvasHeight

    protected transitMap = new TransitMap()

    protected subscribeRider(dist: Distribution) {
        this.transitMap.addToRiderInputs(dist)
    }

    protected subscribeDestination(dist: Distribution) {
        this.transitMap.addToDestinationInputs(dist)
    }

    protected renderer = inject(Renderer)

    sampleRider() {
        const {x, y} = this.transitMap.sampleRiders()
        console.log(x,y)
        this.renderer.renderPoint(x,y)
    }
    sampleDestination() {
        const {x, y} = this.transitMap.sampleDestinations()
        console.log(x,y)
        this.renderer.renderPoint(x,y)
    }

    generateRoute() {
        const rider = this.transitMap.sampleRiders()
        const destination = this.transitMap.sampleDestinations()
        this.renderer.renderPath(rider.x, rider.y, destination.x, destination.y)
    }

}
