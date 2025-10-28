import { AfterViewInit, Component, inject, model } from '@angular/core';
import { Canvas } from "../canvas/canvas";
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { Renderer } from '../../render/renderer';
import { Distribution } from '../../model/distribution';
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tv-road-proto-app',
  imports: [Canvas, MatSliderModule, FormsModule],
  templateUrl: './road-proto-app.html',
  styleUrl: './road-proto-app.css'
})
export class RoadProtoApp implements AfterViewInit {
    protected canvasWidth: number = GLOBAL_canvasWidth
    protected canvasHeight: number = GLOBAL_canvasHeight
    protected renderer = inject(Renderer)
    protected distribution = new Distribution(this.canvasWidth, this.canvasHeight)

    // road center to road center
    public blockWidth = model(50)
    public blockHeight = model(50)
    public roadWidth = model(10)
    public startX = model(0)
    public startY = model(0)

    ngAfterViewInit() {
        this.drawGrid()
    }
    

    drawGrid() {
        for (let x = 0; x < this.distribution.width; x++) {
            for (let y = 0; y < this.distribution.height; y++) {
                const blockX = (this.startX() + x) % (this.blockWidth())
                const blockY = (this.startY() + y) % (this.blockHeight())
                const halfRoad = this.roadWidth()/2
                if (blockX < halfRoad || blockY < halfRoad) {
                    this.distribution.setValue(x, y, 1)
                }
                else if (blockX > this.blockWidth() - halfRoad || blockY > this.blockHeight() - halfRoad) {
                    this.distribution.setValue(x, y, 1)
                }
                else {
                    this.distribution.setValue(x, y, 0)
                }
            }
        }
        this.renderer.renderImageData(this.distribution.toImageData())

    }

    
}
