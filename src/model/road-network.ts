import { rng } from "../math/rng"
import { serializePoint } from "./point"
import { RoadIntersection } from "./road-intersection"
import { RoadSegment } from "./road-segment"

export class RoadNetwork {
    public segments: RoadSegment[] = []
    public intersections = new Map<string, RoadIntersection>()
    private seed = Math.random()
    generateGrid(startX: number, startY: number, width: number, height: number, blockWidth: number, blockHeight: number, roadWidth: number, skipRate = 0) {
        [this.segments, this.intersections] = generateGrid(startX, startY, width, height, blockWidth, blockHeight, roadWidth, skipRate, this.seed)
    }

}

/**
 * Generates a grid of RoadSegments and RoadIntersections, and updates this class's collections
 * to the new grid
 * 
 * @param startX 
 * @param startY 
 * @param width - total width of the grid
 * @param height - total height of the grid
 * @param blockWidth - width of each block (road center to road center)
 * @param blockHeight - height of each block (road center to road center)
 * @param roadWidth - width of each road (doesn't affect block density)
 * @param skipRate - likelihood of skipping a road segment. Should be a probability [0,1)
 */
function generateGrid(
    startX: number, 
    startY: number, 
    width: number, 
    height: number, 
    blockWidth: number, 
    blockHeight: number, 
    roadWidth: number, 
    skipRate = 0, 
    seed = Math.random(),
): [RoadSegment[], Map<string,RoadIntersection>] {
    const random = rng("" + seed)
    
    const intersections = new Map<string, RoadIntersection>()
    const segments = []
    // generate intersections
    for (let y = startY; y < height; y += blockHeight) {
        for (let x = startX; x < width; x += blockWidth) {
            intersections.set(serializePoint({x,y}), new RoadIntersection({x, y}))
        }
    }
    // connect intersections with roads
    for (let y = startY; y < height; y += blockHeight) {
        for (let x = startX; x < width; x += blockWidth) {
            if (x != startX && random() > skipRate) {
                const westSegment = new RoadSegment({x: x-blockWidth, y: y}, {x,y}, roadWidth)

                const startInt = intersections.get(serializePoint(westSegment.start))
                const endInt = intersections.get(serializePoint(westSegment.end))
                if (startInt) {
                    startInt?.connections.push(westSegment)
                    westSegment.connections.push(startInt)
                }
                if (endInt) {
                    endInt.connections.push(westSegment)
                    westSegment.connections.push(endInt)
                }
                segments.push(westSegment)
            }
            if (y != startY && random() > skipRate) {
                const northSegment = new RoadSegment({x: x, y: y-blockHeight}, {x,y}, roadWidth)
                intersections.get(serializePoint(northSegment.start))?.connections.push(northSegment)
                intersections.get(serializePoint(northSegment.end))?.connections.push(northSegment)
                segments.push(northSegment)
            }
        }
    }
    for (const [key, intersection] of intersections) {
        if (intersection.connections.length == 0) {
            intersections.delete(key)
        }
    }

    return [segments, intersections]

}

