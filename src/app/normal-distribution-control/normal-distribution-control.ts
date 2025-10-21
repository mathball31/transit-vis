import { Component, input, model, AfterViewInit, inject } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule } from '@angular/forms';
import { Distribution, normalDistribution } from '../../model/distribution';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';
import { Renderer } from '../../render/renderer';

const default_color = {
        red: .5,
        blue: .5,
        green: .5,
        alpha: 1,
}
@Component({
    selector: 'tv-normal-distribution-control',
    imports: [MatSliderModule, FormsModule],
    templateUrl: './normal-distribution-control.html',
    styleUrl: './normal-distribution-control.css'
})
export class NormalDistributionControl implements AfterViewInit {
    protected width = input<number>(GLOBAL_canvasWidth)
    protected height = input<number>(GLOBAL_canvasHeight)
    protected mu = model<number>(.5)
    protected sigma = model<number>(.25)
    protected distribution = new Distribution()
    public color = input(default_color)
    private renderer = inject(Renderer)

    ngAfterViewInit() {
        this.render()
    }

    update() {
        this.distribution.data = normalDistribution(this.width(), this.height(), this.mu() * this.width(), this.sigma() * this.width()).data
        this.render()
    }

    render() {
        this.renderer.render(this.distribution.toImageData(this.color()))
    }
}
