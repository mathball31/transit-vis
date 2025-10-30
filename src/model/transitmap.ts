import { Distribution } from "./distribution.js";
import { Renderer } from "../render/renderer.js";
import { inject } from "@angular/core";
import { RoadNetwork } from "./road-network.js";


const defaultColor = {
        red: .5,
        blue: .5,
        green: .5,
        alpha: 1,
}
const riderColor = {
        red: 1,
        blue: 0,
        green: 0,
        alpha: 1,
}
const destinationColor = {
        red: 0,
        blue: 1,
        green: 0,
        alpha: 1,
}
export class TransitMap {
    private renderer = inject(Renderer)

    public roadNetwork = new RoadNetwork()

    private inputRiderDistributions: Distribution[] = []
    public addToRiderInputs(distribution: Distribution) {
        this.inputRiderDistributions.push(distribution)
    }
    public outputRiderDistribution(): Distribution {
        return this.inputRiderDistributions.reduce(Distribution.add, new Distribution())
    }

    public sampleRiders() {
        return this.outputRiderDistribution().sample()
    }

    private inputDestinationDistributions: Distribution[] = []
    public addToDestinationInputs(distribution: Distribution) {
        this.inputDestinationDistributions.push(distribution)
    }
    public outputDestinationDistribution(): Distribution {
        return this.inputDestinationDistributions.reduce(Distribution.add, new Distribution())
    }

    public sampleDestinations() {
        return this.outputDestinationDistribution().sample()
    }

    public render() {
        const riderImage = this.outputRiderDistribution().toImageData(riderColor)
        const destinationImage = this.outputDestinationDistribution().toImageData(destinationColor)
        const resultData = riderImage.data.map((val, idx) => {
            return (val + destinationImage.data[idx]) / 2
        } )
        const resultImage = new ImageData(resultData, riderImage.width, riderImage.height)
        this.renderer.renderImageData(resultImage)

        this.roadNetwork.segments.forEach((segment) => {
            this.renderer.renderPath2D(segment.toPath2D(), segment.width)
        })
        
    }
}
