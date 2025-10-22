import { Component, model } from '@angular/core';
import { normal2dDistribution, xy } from '../../../model/distribution';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AbstractDistributionControl } from '../abstract-distribution-control/abstract-distribution-control';

@Component({
  selector: 'tv-normal-2-d-distribution-control',
    imports: [MatSliderModule, FormsModule],
  templateUrl: './normal-2-d-distribution-control.html',
  styleUrl: './normal-2-d-distribution-control.css'
})
export class Normal2DDistributionControl extends AbstractDistributionControl {
    protected mu_x = model(.5)
    protected mu_y = model(.5)
    protected sigma = model(.1)

    override calculate(): void {
        const mu = xy(this.mu_x() * this.width(), this.mu_y() * this.height())
        const sigma = xy(this.sigma() * this.width(), this.sigma() * this.height())
        this.distribution.data = normal2dDistribution(this.width(), this.height(), mu, sigma).data
    }
}
