import { inject } from "@angular/core"
import {CanvasContextWrapper} from "../canvas-context-wrapper.js"
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from "../GLOBALS.js"

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Renderer {
    private canvasContextWrapper = inject(CanvasContextWrapper)
    width: number = this.canvasContextWrapper.context?.canvas.width ?? GLOBAL_canvasWidth
    height: number = this.canvasContextWrapper.context?.canvas.height ?? GLOBAL_canvasHeight
    
    render(imageData: ImageData) {
        if (!this.canvasContextWrapper.context) {
            throw "no Canvas Context"
        }
        this.canvasContextWrapper.context.putImageData(imageData, 0, 0)
    }
}