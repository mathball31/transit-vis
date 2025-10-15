import { TransitMap } from "./transitmap.js"
import { renderDistribution } from "./renderdist.js";
import { linearGradient, normalDistribution } from "./distribution.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d');

if( ctx == null) {
    throw 1
}

const mu_element = document.querySelector("#mu");
const mu_input = document.querySelector("#mu_input");

if (mu_element == null) {
    throw 1
}
if (mu_input == null) {
    throw 1
}
const sigma_element = document.querySelector("#sigma");
const sigma_input = document.querySelector("#sigma_input");

if (sigma_element == null) {
    throw 1
}
if (sigma_input == null) {
    throw 1
}
/*
let mu = mu_input.value
let sigma = sigma_input.value
mu_element.textContent = mu;
sigma_element.textContent = sigma;
renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: .5, green: 0, blue: 0})
renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: 0, green: .5, blue: .5})
mu_input.addEventListener("input", (event) => {
    mu = event.target.value
    mu_element.textContent = mu
    renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: .5, green: 0, blue: 0})
    renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: 0, green: .5, blue: .5})
});

sigma_input.addEventListener("input", (event) => {
    sigma = event.target.value
    sigma_element.textContent = sigma;
    renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: .5, green: 0, blue: 0})
    renderDistribution(ctx, normalDistribution(300, 300, mu * 300, sigma * 300), 10, 10, {red: 0, green: .5, blue: .5})
});

*/