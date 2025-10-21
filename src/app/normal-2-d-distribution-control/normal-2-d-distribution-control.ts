import { Component, inject, input, model, AfterViewInit } from '@angular/core';
import { Distribution, normal2dDistribution, xy } from '../../model/distribution';
import { Renderer } from '../../render/renderer';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../GLOBALS';

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
    protected width = input<number>(GLOBAL_canvasWidth)
    protected height = input<number>(GLOBAL_canvasHeight)
    
    protected mu_x = model(.5)
    protected mu_y = model(.5)
    protected sigma = model(.1)
    protected distribution = new Distribution()
    public color = input(default_color)
    private renderer = inject(Renderer)
    
    // TODO
    // add to transitmap input distributions

    ngAfterViewInit() {
        this.update()
    }

    update() {
        const mu = xy(this.mu_x() * this.width(), this.mu_y() * this.height())
        const sigma = xy(this.sigma() * this.width(), this.sigma() * this.height())
        this.distribution.data = normal2dDistribution(this.width(), this.height(), mu, sigma).data
        this.render()
    }

    render() {
        this.renderer.render(this.distribution.toImageData(this.color()))
    }
}
