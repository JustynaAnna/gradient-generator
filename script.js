const hexNumbers = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
let hex1 = "";
let hex2 = "";
let hex3 = "";

const hexDir = document.querySelector(".hexDirection");
const hex1Def = document.querySelector(".hex1");
const hex2Def = document.querySelector(".hex2");
const hex3Def = document.querySelector(".hex3");
const defHexDir = hexDir.textContent;
const defaultHex1 = hex1Def.textContent;
const defaultHex2 = hex2Def.textContent;
const defaultHex3 = hex3Def.textContent;
const randomGradBox = document.querySelector(".random-gradient-box");
const inputColors = document.querySelectorAll(".colors-input input");
const copyBtn = document.querySelector("#copy");
const gradBox = document.querySelector(".gradient-box");
const gradText = document.querySelector(".gradient-text");
const defaultText = gradText.textContent;

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
  randomGradBox.style.background = `linear-gradient(${selectedDirection}, #${hex1}, #${hex2}${hex3 ? `, #${hex3}` : ''})`;
}

document.querySelector(".refresh").addEventListener("click", () => {
  randomGradBox.style.background = "linear-gradient(to top, #05a2f6, #ffe725)";
  hexDir.textContent = defHexDir;
  hex1Def.textContent = defaultHex1;
  hex2Def.textContent = defaultHex2;
  hex3Def.textContent = defaultHex3;  
});

const generatePaletteGradient = () => {
  const selectedDirection = document.querySelector(".gradient-direction-palette").value;
  const gradient = `linear-gradient(${selectedDirection}, ${inputColors[0].value}, ${inputColors[1].value})`;
  gradBox.style.background = gradient;
  gradText.textContent  = `${gradient};`;
}

inputColors.forEach(input => {
  input.addEventListener("input", () => generatePaletteGradient());
});

function applyPaletteDirection() {
  const selectedPaletteDirection = document.querySelector(".gradient-direction-palette").value;
  gradBox.style.background = `linear-gradient(${selectedPaletteDirection}, ${inputColors[0].value}, ${inputColors[1].value})`;
  gradText.textContent = `linear-gradient(${selectedPaletteDirection}, ${inputColors[0].value}, ${inputColors[1].value});`;
}

document.querySelector(".refresh-box").addEventListener("click", () => {
  gradBox.style.background = "linear-gradient(to top, #05a2f6, #ffe725)";
  gradText.textContent = defaultText;
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