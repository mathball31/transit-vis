import { AfterViewInit, Component, inject, model, OnInit } from '@angular/core';
import { Canvas } from "../canvas/canvas";
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { Renderer } from '../../render/renderer';
import { Slider } from "../slider/slider";
import { RoadNetwork } from '../../model/road-network';


@Component({
  selector: 'tv-road-proto-app',
  imports: [Canvas, Slider],
  templateUrl: './road-proto-app.html',
  styleUrl: './road-proto-app.css'
})
export class RoadProtoApp implements AfterViewInit, OnInit {
    protected canvasWidth: number = GLOBAL_canvasWidth
    protected canvasHeight: number = GLOBAL_canvasHeight
    protected renderer = inject(Renderer)
    protected roadNetwork = new RoadNetwork()

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
        this.drawGrid()
    }

    protected numIntersections() {
        return this.roadNetwork.intersections.size
    }

    connectionsPerIntersection() {
        let totalConnections = 0
        for (const intersection of this.roadNetwork.intersections.values()) {
            totalConnections += intersection.connections.length
        }
        return totalConnections / this.roadNetwork.intersections.size
    }

    generateGrid() {
        this.roadNetwork.generateGrid(
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

    drawGrid() {
        this.roadNetwork.segments.forEach((segment) => {
            this.renderer.renderPath2D(segment.toPath2D(), this.roadWidth())
        })
    }

    refreshGrid() {
        this.renderer.context?.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.generateGrid()
        this.drawGrid()
    }
}