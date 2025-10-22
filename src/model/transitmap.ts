import { Distribution } from "./distribution.js";
import { Renderer } from "../render/renderer.js";
import { inject } from "@angular/core";


const default_color = {
        red: .5,
        blue: .5,
        green: .5,
        alpha: 1,
}
export class TransitMap {
    private renderer = inject(Renderer)

    public inputDistributions: Distribution[] = []
    public outputDistribution(): Distribution {
        return this.inputDistributions.reduce(Distribution.add)
    }


    public render() {
        this.renderer.render(this.outputDistribution().toImageData(default_color))
    }
}
