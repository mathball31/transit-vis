import { AfterViewInit, Component, inject, model, OnInit } from '@angular/core';
import { Canvas } from "../canvas/canvas";
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { Renderer } from '../../render/renderer';
import { Slider } from "../slider/slider";
import { TransitMap } from '../../model/transitmap';
import { Normal2DDistributionControl } from "../distribution-control/normal-2-d-distribution-control/normal-2-d-distribution-control";
import { Distribution } from '../../model/distribution';


@Component({
  selector: 'tv-road-proto-app',
  imports: [Canvas, Slider, Normal2DDistributionControl],
  templateUrl: './road-proto-app.html',
  styleUrl: './road-proto-app.css'
})
export class RoadProtoApp implements AfterViewInit, OnInit {
    protected canvasWidth: number = GLOBAL_canvasWidth
    protected canvasHeight: number = GLOBAL_canvasHeight
    private renderer = inject(Renderer)
    protected transitMap = new TransitMap()

    // road center to road center
    public blockWidth = model(50)
    public blockHeight = model(50)
    public roadWidth = model(10)
    public startX = model(20)
    public startY = model(20)
    public skipRate = model(0)

    ngOnInit() {
        this.generateGrid()
    }

    ngAfterViewInit() {
        this.transitMap.render()
    }

    protected numIntersections() {
        return this.transitMap.roadNetwork.intersections.size
    }

    connectionsPerIntersection() {
        let totalConnections = 0
        for (const intersection of this.transitMap.roadNetwork.intersections.values()) {
            totalConnections += intersection.connections.length
        }
        return totalConnections / this.transitMap.roadNetwork.intersections.size
    }

    generateGrid() {
        this.transitMap.roadNetwork.generateGrid(
            this.startX(), 
            this.startY(), 
            this.canvasWidth, 
            this.canvasHeight, 
            this.blockWidth(), 
            this.blockHeight(), 
            this.roadWidth(),
            this.skipRate(),
        ) 
    }

    refreshGrid() {
        this.renderer.context?.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.generateGrid()
        this.transitMap.render()
    }
}