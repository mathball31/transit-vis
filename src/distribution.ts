export interface Distribution {
    data: number[]
    width: number
    height: number
}


export function blankDistribution(width: number = 300, height: number = 300): Distribution {
    return {
        data: new Array(width * height).fill(100), 
        width: width, 
        height: height
    }
}

export function linearGradient(width: number = 300, height: number = 300): Distribution {
    const data = new Array(width * height).fill(0)

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            data[x + y * width] = x / width
        }
    }

    return {
        data: data,
        width: width, 
        height: height
    }

}
export function normalDistribution(width: number = 300, height: number = 300): Distribution {
    const data = new Array(width * height)
    const mu = width/2
    const sigma = width/6
    const normalizeFactor = Math.sqrt(2 * Math.PI * sigma)
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            data[x + y * width] = Math.exp(-0.5 * ((x-mu)/sigma)**2 )
        }
    }
    console.log(data)
    return {
        data: data,
        width: width, 
        height: height
    }
}
