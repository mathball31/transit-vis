import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Renderer {
    public context?: CanvasRenderingContext2D
    
    renderPoint(x: number, y: number) {
        if (!this.context) {
            throw "no Canvas Context"
        }
        this.context.beginPath()
        this.context.ellipse(x,y,1,1,0,0, 2 * Math.PI)
        this.context.stroke()

    }
    renderImageData(imageData: ImageData) {
        if (!this.context) {
            throw "no Canvas Context"
        }
        this.context.putImageData(imageData, 0, 0)
    }
}