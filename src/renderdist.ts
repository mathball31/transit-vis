import { type Distribution } from "./distribution.js"


export function renderDistribution(ctx: CanvasRenderingContext2D, dist: Distribution, dx: number, dy: number) {
    const imageData = ctx.createImageData(dist.width, dist.height)
    const data = imageData.data
    console.log(dist.data)
    for (let i = 0; i * 4 < data.length; i++) {
        data[4*i] = (dist.data[i] ?? 0) * 255       //red
        data[4*i+1] = (dist.data[i] ?? 0) * 255     // green
        data[4*i+2] = (dist.data[i] ?? 0) * 255     // blue
        data[4*i+3] = 1 * 255     // transparency
    }

    console.log(data)

    ctx.putImageData(imageData, dx, dy)



}