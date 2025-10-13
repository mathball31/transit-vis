export class TransitMap {
    width;
    height;
    riderDist;
    constructor(width, height) {
        this.width = width ?? 300;
        this.height = height ?? 300;
        this.riderDist = {
            data: new Array(this.width * this.height).fill(0),
            width: this.width,
            height: this.height
        };
    }
}
