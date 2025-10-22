import { AfterViewInit, Component, input } from '@angular/core';
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../../../GLOBALS';
import { TransitMap } from '../../../model/transitmap';
import { Distribution } from '../../../model/distribution';

@Component({
  imports: [],
  templateUrl: './abstract-distribution-control.html',
  styleUrl: './abstract-distribution-control.css'
})
export abstract class AbstractDistributionControl implements AfterViewInit {
    public width = input<number>(GLOBAL_canvasWidth)
    public height = input<number>(GLOBAL_canvasHeight)
    public transitMap = input.required<TransitMap>()
    
    protected distribution = new Distribution()
    

    ngAfterViewInit() {
        this.transitMap().inputDistributions.push(this.distribution)
        this.update()
    }

    sample() {
        const {x, y} = this.distribution.sample()
        console.log(x,y)
    }

    abstract calculate(): void

    update() {
        this.calculate()
        this.render()
    }

    render() {
        this.transitMap().render()
    }

}
