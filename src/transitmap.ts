import { blankDistribution, type Distribution } from "./distribution.js";

export class TransitMap {
    width: number;
    height: number;
    riderDist: Distribution

    constructor(width?: number, height?: number, dist?: Distribution) {
        this.width = width ?? 300;
        this.height = height ?? 300;

        this.riderDist = dist ?? blankDistribution(width, height)
    }
}
