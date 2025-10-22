import { AfterViewInit, Component, input, output } from '@angular/core';
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
    public subscribe = output<Distribution>()
    
    protected distribution = new Distribution()
    
    ngAfterViewInit() {
        this.subscribe.emit(this.distribution)
        this.update()
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
