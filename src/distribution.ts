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

export function blankDistribution(width: number = 300, height: number = 300): Distribution {
    return {
        data: new Array(width * height).fill(100), 
        width: width, 
        height: height
    }
}

export function linearGradient(width: number = 300, height: number = 300): Distribution {
    function formula(x: number, y: number) {
        return x / width
    }
    return fillDistributionFromFormula(width, height, formula)
}

export function normalDistribution(width: number = 300, height: number = 300, mu: number = width/2, sigma: number = width/6): Distribution {
    // const mu = width/2
    // const sigma = width/6
    const normalizeFactor = Math.sqrt(2 * Math.PI * sigma)
    function formula(x: number, y: number) {
        return Math.exp(-0.5 * ((x-mu)/sigma)**2 )
    }
    return fillDistributionFromFormula(width, height, formula)
}
