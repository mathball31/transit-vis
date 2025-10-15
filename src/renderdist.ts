import { type Distribution } from "./distribution.js"


export function renderDistribution(
    ctx: CanvasRenderingContext2D, 
    dist: Distribution, 
    dx: number, 
    dy: number, 
    color = {red: 1, green: 1, blue: 1}
) {
    const imageData = ctx.createImageData(dist.width, dist.height)
    const data = imageData.data
    console.log(dist.data)
    for (let i = 0; i * 4 < data.length; i++) {
        data[4*i] = 255-(((dist.data[i] ?? 0)  * 255) * (1- color.red))
        data[4*i+1] = 255-(((dist.data[i] ?? 0)  * 255) * (1-color.green))
        data[4*i+2] = 255-(((dist.data[i] ?? 0)  * 255) * (1-color.blue))
        data[4*i+3] = .5 * 255     // transparency
    }

    // console.log(data)

    ctx.putImageData(imageData, dx, dy)



}