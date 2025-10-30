export interface Point {
    x: number,
    y: number
}

export function serializePoint(point: Point) {
    return "" + point.x + "," + point.y
}