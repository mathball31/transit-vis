import { Component, ElementRef, inject, input, ViewChild, AfterViewInit } from '@angular/core';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { CanvasContextWrapper } from '../../canvas-context-wrapper';

@Component({
  selector: 'tv-canvas',
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css'
})
export class Canvas implements AfterViewInit {
    public width = input(GLOBAL_canvasWidth)
    public height = input(GLOBAL_canvasHeight)


    @ViewChild('mapCanvas')
    private canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef

    private canvasContextWrapper = inject(CanvasContextWrapper)
    // private renderer = inject(Renderer)

    ngAfterViewInit() {
        this.canvasContextWrapper.context = this.canvas.nativeElement.getContext('2d') ?? undefined
    }


}
