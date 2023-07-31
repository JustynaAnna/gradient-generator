const hexNumbers = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
let hex1 = "";
let hex2 = "";
let hex3 = "";

const inputColors = document.querySelectorAll(".colors-input input");
const container = document.querySelector(".container");
const copyBtn = document.querySelector("#copy");
const gradientBox = document.querySelector(".gradient-box");
const textarea = document.querySelector("textarea");
const selectDirection = document.querySelector(".gradient-direction-palette");

document.querySelector("#generateTwoColors").addEventListener("click", () => {
  generateRandomHex(2);
  applyDirection();
});

document.querySelector("#generateThreeColors").addEventListener("click", () => {
  generateRandomHex(3);
  applyDirection();
});

document.querySelector("#copy").addEventListener("click", () => {
  copyHex();
});

document.querySelector("#gradientDirection").addEventListener("change", () => {
  applyDirection();
});

document.querySelector(".gradient-direction-palette").addEventListener("change", () => {
  applyPaletteDirection();
});

function generateRandomHex(numColors) {
  hex1 = "";
  hex2 = "";
  hex3 = "";
  for (let i = 0; i < 6; i++) {
    hex1 += hexNumbers[Math.floor(Math.random() * hexNumbers.length)];
    hex2 += hexNumbers[Math.floor(Math.random() * hexNumbers.length)];
    if (numColors === 3) {
      hex3 += hexNumbers[Math.floor(Math.random() * hexNumbers.length)];
    }
  }
  document.querySelector(".hex1").innerHTML = hex1;
  document.querySelector(".hex2").innerHTML = hex2;
  if (numColors === 3) {
    document.querySelector(".hex3").innerHTML = hex3;
  }
}

function copyHex() {
  const selectedDirection = document.querySelector("#gradientDirection").value;
  const gradient = `linear-gradient(${selectedDirection}, #${hex1}, #${hex2} ${hex3 ? `, #${hex3}` : ''})`;
  navigator.clipboard.writeText(gradient);
  copyBtn.innerText = "Code Copied";
  setTimeout(() => copyBtn.innerText = "Copy", 1600);
}

function applyDirection() {
  const selectedDirection = document.querySelector("#gradientDirection").value;
  document.querySelector(".hexDirection").textContent = selectedDirection;
  container.style.background = `linear-gradient(${selectedDirection}, #${hex1}, #${hex2}${hex3 ? `, #${hex3}` : ''})`;
}

document.querySelector(".refresh").addEventListener("click", () => {
  container.style.background = "white";
});

const generatePaletteGradient = () => {
  const selectedDirection = document.querySelector(".gradient-direction-palette").value;
  const gradient = `linear-gradient(${selectedDirection}, ${inputColors[0].value}, ${inputColors[1].value})`;
  gradientBox.style.background = gradient;
  textarea.value = `background-image: ${gradient};`;
}

inputColors.forEach(input => {
  input.addEventListener("input", () => generatePaletteGradient());
});

function applyPaletteDirection() {
  const selectedPaletteDirection = document.querySelector(".gradient-direction-palette").value;
  gradientBox.style.background = `linear-gradient(${selectedPaletteDirection}, ${inputColors[0].value}, ${inputColors[1].value})`;
  textarea.value = `background-image: linear-gradient(${selectedPaletteDirection}, ${inputColors[0].value}, ${inputColors[1].value});`;
}

document.querySelector(".refresh-box").addEventListener("click", () => {
  gradientBox.style.background = "linear-gradient(to top, #0003f5, #ffe725)";
  const colorInputs = document.querySelectorAll("input[type='color']");
  colorInputs.forEach(input => {
    input.value = input.defaultValue;
  });
});

document.querySelector("#copyPalette").addEventListener("click", () => {
  const selectedPaletteDirection = document.querySelector(".gradient-direction-palette").value;
  const gradient = `linear-gradient(${selectedPaletteDirection}, ${inputColors[0].value}, ${inputColors[1].value})`;
  navigator.clipboard.writeText(gradient);
  copyPalette.innerText = "Code Copied";
  setTimeout(() => copyPalette.innerText = "Copy", 1600);
});