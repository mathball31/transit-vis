import { blankDistribution } from "./distribution.js";
export class TransitMap {
    width;
    height;
    riderDist;
    constructor(width, height, dist) {
        this.width = width ?? 300;
        this.height = height ?? 300;
        this.riderDist = dist ?? blankDistribution(width, height);
    }
}
