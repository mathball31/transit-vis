import { Component, ElementRef, inject, input, ViewChild, AfterViewInit } from '@angular/core';
import { CanvasContextWrapper } from '../canvas-context-wrapper';

@Component({
  selector: 'tv-canvas',
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css'
})
export class Canvas implements AfterViewInit {
    public width = input(600)
    public height = input(600)


    @ViewChild('mapCanvas')
    private canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef

    private canvasContextWrapper = inject(CanvasContextWrapper)

    ngAfterViewInit() {
        this.canvasContextWrapper.context = this.canvas.nativeElement.getContext('2d') ?? undefined
    }


}
