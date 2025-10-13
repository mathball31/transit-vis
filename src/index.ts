import { TransitMap } from "./transitmap.js"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d');

const map = new TransitMap();
console.log('help')

if( ctx == null) {
    throw 1
}
ctx.fillStyle = "rgb(200 0 0)";
ctx.fillRect(10, 10, map.width, map.height)
ctx.fillRect(10, 10, 50, 50)

ctx.fillStyle = "rgb(0 0 200 / 50%)";
ctx.fillRect(30, 30, 50, 50);

