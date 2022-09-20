const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById("colorInput");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");
const gridSize = document.getElementById("gridSize");
const sizeSlider = document.getElementById("sizeSlider");

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("erase");
clearBtn.onclick = () => reloadGrid();
sizeSlider.oninput = (e) => setCurrentSize(e.target.value);

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
  indicateSelectedButton();
}

function setCurrentSize(newSize) {
  currentSize = newSize;
  gridSize.textContent = `${currentSize} x ${currentSize}`;
  reloadGrid();
}

function createGrid(size) {
  document.documentElement.style.setProperty("--columns-row", size);
  for (let i = 0; i < size ** 2; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
    div.addEventListener("mousedown", draw);
    div.addEventListener("mouseover", draw);
  }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function draw(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "erase") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

function reloadGrid() {
  clearGrid();
  createGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

function indicateSelectedButton() {
  if (currentMode === "color") {
    buttonColorActive(colorBtn);
    buttonColorInactive(rainbowBtn);
    buttonColorInactive(eraserBtn);
  } else if (currentMode === "rainbow") {
    buttonColorInactive(colorBtn);
    buttonColorActive(rainbowBtn);
    buttonColorInactive(eraserBtn);
  } else if (currentMode === "erase") {
    buttonColorInactive(colorBtn);
    buttonColorInactive(rainbowBtn);
    buttonColorActive(eraserBtn);
  }
}

function buttonColorActive(button) {
  button.style.backgroundColor = "black";
  button.style.color = "white";
}

function buttonColorInactive(button) {
  button.style.backgroundColor = "white";
  button.style.color = "black";
}

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  gridSize.textContent = `${currentSize} x ${currentSize}`;
  indicateSelectedButton();
};
