const minN = 10;
const maxN = 10000;

let n = minN;

const nSliderElement = document.getElementById("n-slider");
const nDisplayElement2 = document.getElementById("n-display-2");
const bArrayElement = document.getElementById("b-array");
const r1ArrayElement = document.getElementById("r1-array");
const r1DisplayElement = document.getElementById("r1-display");
const bSizeDisplayElement = document.getElementById("b-size");
const r2ArrayElement = document.getElementById("r2-array");
const r2DisplayElement = document.getElementById("r2-display");
const totalBitsDisplayElement = document.getElementById("total-bits");

document.addEventListener("DOMContentLoaded", function() {
  nSliderElement.setAttribute("min", minN);
  nSliderElement.setAttribute("max", maxN);
  nSliderElement.setAttribute("value", n);
  nSliderElement.setAttribute("step", 1);
});

setNDisplay(n);
setBArrayWidth(n);
setR1ArrayWidth(n);
setR2ArrayWidth(n);

totalBitsDisplayElement.innerText = Math.ceil(n + r1TotalBits(n) + r2TotalBits(n)) + " bits";

nSliderElement.addEventListener("input", function (event) {
  n = parseInt(event.target.value);
  setNDisplay(n);
  setBArrayWidth(n);
  setR1ArrayWidth(n);
  setR2ArrayWidth(n);

  totalBitsDisplayElement.innerText = Math.ceil(n + r1TotalBits(n) + r2TotalBits(n)) + " bits";
  bArrayElement.innerHTML = "";
});

function setNDisplay(n) {
  nDisplayElement2.innerText = n + " bits";
}

function r1TotalBits(n) {
  return (n / (Math.log2(n) * Math.log2(n))) * Math.log2(n);
}

function r2TotalBits(n) {
  return (n * Math.log2(Math.log2(n))) / Math.log2(n);
}

function setBArrayWidth(n) {
  const bSizeWidth = bSizeDisplayElement.clientWidth + 10;
  const pn = convertRange(n, [minN, maxN], [1, 100]);

  bArrayElement.style.width = `calc(${pn}% - ${bSizeWidth}px)`;
  bArrayElement.style.minWidth = 50 + "px";
}

function setR1ArrayWidth(n) {
  const pn = convertRange(n, [minN, maxN], [5, 100]);
  const pr = (r1TotalBits(n) / n) * 100;

  const widthRespectToN = convertRange(pr, [1, 100], [0, pn]);

  r1ArrayElement.style.width = `${widthRespectToN}%`;
  r1ArrayElement.style.minWidth = 20 + "px";
  r1DisplayElement.innerText = Math.ceil(r1TotalBits(n)) + " bits";
}

function setR2ArrayWidth(n) {
  const pn = convertRange(n, [minN, maxN], [5, 100]);
  const pr = (r2TotalBits(n) / n) * 100;

  const widthRespectToN = convertRange(pr, [1, 100], [0, pn]);

  r2ArrayElement.style.width = `${widthRespectToN}%`;
  r2ArrayElement.style.minWidth = 30 + "px";
  r2DisplayElement.innerText = Math.ceil(r2TotalBits(n)) + " bits";
}

function convertRange(value, r1, r2) {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}
