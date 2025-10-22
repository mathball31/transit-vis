import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Renderer {
    public context?: CanvasRenderingContext2D
    
    render(imageData: ImageData) {
        if (!this.context) {
            throw "no Canvas Context"
        }
        this.context.putImageData(imageData, 0, 0)
    }
}