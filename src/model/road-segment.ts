import { Point } from "./point"

export class RoadSegment {
    public start: Point
    public end: Point
    public width: number

    constructor(start: Point, end: Point, width?: number) {
        this.start = start
        this.end = end
        this.width = width ?? 10
    }

    public toPath2D(): Path2D {
        const path = new Path2D()
        path.moveTo(this.start.x, this.start.y)
        path.lineTo(this.end.x, this.end.y)
        return path
    }
}