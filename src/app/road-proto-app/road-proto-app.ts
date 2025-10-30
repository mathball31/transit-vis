import { AfterViewInit, Component, inject, model, OnInit } from '@angular/core';
import { Canvas } from "../canvas/canvas";
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { Renderer } from '../../render/renderer';
import { Slider } from "../slider/slider";
import { RoadIntersection } from '../../model/road-intersection';
import { RoadSegment } from '../../model/road-segment';
import { serializePoint } from '../../model/point';

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
    protected segments: RoadSegment[] = []
    protected intersections = new Map<string, RoadIntersection>()

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
        return this.intersections.size
    }

    connectionsPerIntersection() {
        let totalConnections = 0
        for (const intersection of this.intersections.values()) {
            totalConnections += intersection.connections.length
        }
        return totalConnections / this.intersections.size
    }

    generateGrid() {
        const intersections = new Map<string, RoadIntersection>()
        const segments = []
        for (let y = this.startY(); y < this.canvasHeight; y += this.blockHeight()) {
            for (let x = this.startX(); x < this.canvasWidth; x += this.blockWidth()) {
                intersections.set(serializePoint({x,y}), new RoadIntersection({x, y}))
            }
        }
        for (let y = this.startY(); y < this.canvasHeight; y += this.blockHeight()) {
            for (let x = this.startX(); x < this.canvasWidth; x += this.blockWidth()) {
                if (x != this.startX() && Math.random() > this.skipRate()) {
                    const westSegment = new RoadSegment({x: x-this.blockWidth(), y: y}, {x,y}, this.roadWidth())

                    intersections.get(serializePoint(westSegment.start))?.connections.push(westSegment)
                    intersections.get(serializePoint(westSegment.end))?.connections.push(westSegment)
                    segments.push(westSegment)
                }
                if (y != this.startY() && Math.random() > this.skipRate()) {
                    const northSegment = new RoadSegment({x: x, y: y-this.blockHeight()}, {x,y}, this.roadWidth())
                    intersections.get(serializePoint(northSegment.start))?.connections.push(northSegment)
                    intersections.get(serializePoint(northSegment.end))?.connections.push(northSegment)
                    segments.push(northSegment)
                }
            }
        }
        this.segments = segments
        this.intersections = intersections

    }

    drawGrid() {
        this.segments.forEach((segment) => {
            this.renderer.renderPath2D(segment.toPath2D(), this.roadWidth())
        })
    }

    refreshGrid() {
        this.renderer.context?.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        this.generateGrid()
        this.drawGrid()
    }
}