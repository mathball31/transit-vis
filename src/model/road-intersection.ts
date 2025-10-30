import { RoadSegment } from "./road-segment";

export class RoadIntersection {
    public centerPoint: {x: number, y: number}
    public connections: RoadSegment[] = []

    constructor(centerPoint: { x: number; y: number }) {
        this.centerPoint = centerPoint
    }
}