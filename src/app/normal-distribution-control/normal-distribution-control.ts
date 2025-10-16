import { Component, ElementRef, input, model, ViewChild, AfterViewInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule } from '@angular/forms';
import { renderDistribution } from '../../renderdist';
import { normalDistribution } from '../../distribution';

@Component({
    selector: 'tv-normal-distribution-control',
    imports: [MatSliderModule, FormsModule],
    templateUrl: './normal-distribution-control.html',
    styleUrl: './normal-distribution-control.css'
})
export class NormalDistributionControl implements AfterViewInit {
    protected width = input<number>(300)
    protected height = input<number>(300)
    protected mu = model<number>(.5)
    protected sigma = model<number>(.25)
    protected dist = normalDistribution(this.width(), this.height(), this.mu(), this.sigma())
    protected color = {
        red: .5,
        blue: 0,
        green: .5,
        alpha: 1,
    }
    @ViewChild('mapCanvas')
    private canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef

    private ctx: CanvasRenderingContext2D | null | undefined

    ngAfterViewInit() {
        this.ctx = this.canvas.nativeElement.getContext('2d')
        this.render()
    }

    render() {
        this.dist = normalDistribution(this.width(), this.height(), this.mu() * this.width(), this.sigma() * this.width())
        if (this.ctx == null || this.ctx == undefined) {
            throw 1
        }
        renderDistribution(this.ctx, this.dist, 0, 0, this.color)
    }
}
