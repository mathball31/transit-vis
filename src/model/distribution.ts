import { GLOBAL_canvasHeight, GLOBAL_canvasWidth, GLOBAL_mapHeight, GLOBAL_mapWidth } from "../GLOBALS"

export interface DistributionData {
    data: number[]
    width: number
    height: number
}


function binarySearch(list: number[], target: number) {
    let left = 0
    let right = list.length - 1
    let mid = Math.round((right + left) / 2)
    

    while (left < right) {
        mid = Math.round((right + left) / 2)
        if (target < list[mid]) {
            right = mid - 1
        }
        else if (target > list[mid]) {
            left = mid + 1
        }
        if (target == list[mid]) {
            return mid
        }
    }
    return mid
}

export class Distribution {
    data: number[] = []
    width: number
    height: number
    constructor(width = GLOBAL_mapWidth, height = GLOBAL_mapHeight, data?: number[]) {
        this.width = width
        this.height = height
        this.data = data ?? new Array(width * height).fill(0)
    }

    public static add(a: Distribution, b: Distribution): Distribution {
        if (a.width != b.width || a.height != b.height) {
            throw "mismatched distribution size"
        }


        const data =  a.data.map((value, index) => {
            return value + b.data[index]
        })

        return new Distribution(a.width, a.height, data)
        
    }

    public setValue(x: number, y: number, value: number) {
        this.data[x + y * this.width] = value
    }
    public getValue(x: number, y: number) {
        return this.data[x + y * this.width]

    }

    
    /**
     * 
     * @returns x,y coordinate sampled from this.distribution
     */
    public sample() {
        const cdf = Array(this.data.length)
        this.data.forEach((value, index) => {
            if (index == 0) {
                cdf[index] = value
            }
            else {
                cdf[index] = value + cdf[index - 1]
            }
        })

        const normalizedCdf = cdf.map((val) => val/cdf[cdf.length-1])


        const rand = Math.random()
        const sample = binarySearch(normalizedCdf, rand)

        return {
            x: sample % this.width, 
            y: Math.round(sample / this.width)
        }
    }

    public toImageData(
        color = {red: 0, green: 0, blue: 0, alpha: .5}
    ): ImageData {
        const imageData = new ImageData(this.width, this.height)
        for (let i = 0; i * 4 < imageData.data.length; i++) {
            imageData.data[4*i] = 255-(((this.data[i] ?? 0)  * 255) * (1-color.red))
            imageData.data[4*i+1] = 255-(((this.data[i] ?? 0)  * 255) * (1-color.green))
            imageData.data[4*i+2] = 255-(((this.data[i] ?? 0)  * 255) * (1-color.blue))
            imageData.data[4*i+3] = color.alpha * 255     // transparency
        }

        return imageData
    }
}


function fillDistributionFromFormula(width: number, height: number, formula: (x: number, y: number) => number) {
    const data = new Array(width * height)

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            data[x + y * width] = formula(x,y)
        }
    }

    return {
        data: data,
        width: width, 
        height: height
    }
}

export function blankDistribution(width = GLOBAL_canvasWidth, height = GLOBAL_canvasHeight): DistributionData {
    return {
        data: new Array(width * height).fill(100), 
        width: width, 
        height: height
    }
}

export function linearGradient(width = GLOBAL_canvasWidth, height = GLOBAL_canvasHeight): DistributionData {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    function formula(x: number, y: number) {
        return x / width
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return fillDistributionFromFormula(width, height, formula)
}

export function normalDistribution(width = GLOBAL_canvasWidth, height = GLOBAL_canvasHeight, mu: number = width/2, sigma: number = width/6): DistributionData {
    // const normalizeFactor = Math.sqrt(2 * Math.PI * sigma)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    function formula(x: number, y: number) {
        return Math.exp(-0.5 * ((x-mu)/sigma)**2 )
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return fillDistributionFromFormula(width, height, formula)
}

export function xy(x: number, y: number) {
    return {x: x, y: y}
}

/**
 * Note this assumes a cross correlation of zero, and is not normalized. 
 * @param width 
 * @param height 
 * @param mu 
 * @param sigma 
 * @returns 
 */
export function normal2dDistribution(width = GLOBAL_canvasWidth, height = GLOBAL_canvasHeight, mu = xy(width/2, height/2), sigma = xy(width/2, height/2)): DistributionData {
    function formula(x: number, y: number) {
        const dx = x-mu.x
        const dy = y-mu.y
        const x_term = (dx/sigma.x)**2
        // const cross_corr_term = -2 * (dx/sigma.y) * (dy/sigma.x)
        const y_term = (dy/sigma.y)**2
        const exp = -.5 * (x_term + y_term)
        return Math.exp(exp)
    }
    return fillDistributionFromFormula(width, height, formula)
}
