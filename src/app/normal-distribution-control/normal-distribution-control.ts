import { Component, input, model, AfterViewInit, inject } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule } from '@angular/forms';
import { renderDistribution } from '../../renderdist';
import { normalDistribution } from '../../distribution';
import { CanvasContextWrapper } from '../canvas-context-wrapper';

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
    private canvasContextWrapper = inject(CanvasContextWrapper)
    private canvasContext: CanvasRenderingContext2D | undefined

    ngAfterViewInit() {
        this.canvasContext = this.canvasContextWrapper.context 
        this.render()
    }

    render() {
        this.dist = normalDistribution(this.width(), this.height(), this.mu() * this.width(), this.sigma() * this.width())
        if (this.canvasContext == undefined) {
            throw 1
        }
        renderDistribution(this.canvasContext, this.dist, 0, 0, this.color)
    }
}
