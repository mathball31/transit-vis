export interface Distribution {
    data: number[]
    width: number
    height: number
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

export function blankDistribution(width = 300, height = 300): Distribution {
    return {
        data: new Array(width * height).fill(100), 
        width: width, 
        height: height
    }
}

export function linearGradient(width = 300, height = 300): Distribution {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    function formula(x: number, y: number) {
        return x / width
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return fillDistributionFromFormula(width, height, formula)
}

export function normalDistribution(width = 300, height = 300, mu: number = width/2, sigma: number = width/6): Distribution {
    // const normalizeFactor = Math.sqrt(2 * Math.PI * sigma)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    function formula(x: number, y: number) {
        return Math.exp(-0.5 * ((x-mu)/sigma)**2 )
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return fillDistributionFromFormula(width, height, formula)
}
