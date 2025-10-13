import { TransitMap } from "./transitmap.js"
import { renderDistribution } from "./renderdist.js";
import { linearGradient, normalDistribution } from "./distribution.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d');

const map = new TransitMap(300, 300, normalDistribution(300, 300));
console.log('help')

if( ctx == null) {
    throw 1
}

console.log(map.riderDist)
renderDistribution(ctx, map.riderDist)
