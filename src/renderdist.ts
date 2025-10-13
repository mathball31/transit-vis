import { type Distribution } from "./distribution.js"


export function renderDistribution(ctx: CanvasRenderingContext2D, dist: Distribution) {
    const imageData = ctx.createImageData(dist.width, dist.height)
    const data = imageData.data
    console.log(data)

    for (let i = 0; i < data.length; i+= 4) {
        data[i] = dist.data[i/4] ?? 0       //red
        data[i+1] = dist.data[i/4] ?? 0     // green
        data[i+2] = dist.data[i/4] ?? 0     // blue
        data[i+3] = 255     // transparency
    }

    console.log(data)
    console.log(imageData)

    ctx.putImageData(imageData, 10, 10)



}