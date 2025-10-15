import { type Distribution } from "./distribution.js"


export function renderDistribution(
    ctx: CanvasRenderingContext2D, 
    dist: Distribution, 
    dx: number, 
    dy: number, 
    color = {red: 1, green: 1, blue: 1, alpha: .5}
) {
    const imageData = ctx.createImageData(dist.width, dist.height)
    const data = imageData.data
    for (let i = 0; i * 4 < data.length; i++) {
        data[4*i] = 255-(((dist.data[i] ?? 0)  * 255) * (1- color.red))
        data[4*i+1] = 255-(((dist.data[i] ?? 0)  * 255) * (1-color.green))
        data[4*i+2] = 255-(((dist.data[i] ?? 0)  * 255) * (1-color.blue))
        data[4*i+3] = color.alpha * 255     // transparency
    }


    ctx.putImageData(imageData, dx, dy)



}