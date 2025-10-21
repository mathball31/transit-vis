import { Component, inject, input, model, AfterViewInit } from '@angular/core';
import { normal2dDistribution, xy } from '../../distribution';
import { renderDistribution } from '../../renderdist';
import { CanvasContextWrapper } from '../canvas-context-wrapper';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

const default_color = {
        red: .5,
        blue: .5,
        green: .5,
        alpha: 1,
}
@Component({
  selector: 'tv-normal-2-d-distribution-control',
    imports: [MatSliderModule, FormsModule],
  templateUrl: './normal-2-d-distribution-control.html',
  styleUrl: './normal-2-d-distribution-control.css'
})
export class Normal2DDistributionControl implements AfterViewInit {
    protected width = input<number>(300)
    protected height = input<number>(300)
    
    protected mu = model<{x: number, y: number}>({x: .5, y: .5})
    protected mu_x = model(.5)
    protected mu_y = model(.5)
    protected sigma = model<{x: number, y: number}>({x: .25, y: .25})
    protected sigma_x = model(.25)
    protected sigma_y = model(.25)
    protected dist = normal2dDistribution(this.width(), this.height(), this.mu(), this.sigma())
    public color = input(default_color)
    private canvasContextWrapper = inject(CanvasContextWrapper)
    private canvasContext: CanvasRenderingContext2D | undefined

    ngAfterViewInit() {
        this.canvasContext = this.canvasContextWrapper.context 
        this.render()
    }

    render() {
        const mu = xy(this.mu_x() * this.width(), this.mu_y() * this.height())
        const sigma = xy(this.sigma_x() * this.width(), this.sigma_x() * this.height())
        this.dist = normal2dDistribution(this.width(), this.height(), mu, sigma)
        if (this.canvasContext == undefined) {
            throw 1
        }
        renderDistribution(this.canvasContext, this.dist, 0, 0, this.color())
    }
}
