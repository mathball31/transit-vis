import type { Distribution } from "./distribution.js";

export class TransitMap {
    width: number;
    height: number;
    riderDist: Distribution

    constructor(width?: number, height?: number) {
        this.width = width ?? 300;
        this.height = height ?? 300;

        this.riderDist = {
            data: new Array(this.width * this.height).fill(0), 
            width: this.width, 
            height: this.height
        }
    }


}