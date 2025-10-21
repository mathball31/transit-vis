import { blankDistribution, Distribution, type DistributionData } from "./distribution.js";
import { GLOBAL_canvasHeight, GLOBAL_canvasWidth } from '../GLOBALS.js';


export class TransitMap {
    width: number;
    height: number;
    riderDist: DistributionData

    constructor(width: number, height: number, dist?: DistributionData) {
        this.width = width ?? GLOBAL_canvasWidth;
        this.height = height ?? GLOBAL_canvasHeight;

        this.riderDist = dist ?? blankDistribution(width, height)
    }

    public inputDistributions: Distribution[] = []



    //TODO
    // . how to manage and update multiple distributions?
    //      . list of subscribed distributions
    //      . 
}
