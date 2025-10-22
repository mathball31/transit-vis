import { Component, input, model } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule } from '@angular/forms';
import { normalDistribution } from '../../../model/distribution';
import { AbstractDistributionControl } from '../abstract-distribution-control/abstract-distribution-control';

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
export class NormalDistributionControl extends AbstractDistributionControl {
    protected mu = model<number>(.5)
    protected sigma = model<number>(.25)
    public color = input(default_color)

    override calculate(): void {
        this.distribution.data = normalDistribution(this.width(), this.height(), this.mu() * this.width(), this.sigma() * this.width()).data
    }
}
