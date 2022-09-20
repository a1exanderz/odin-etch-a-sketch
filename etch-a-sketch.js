let currentColor = "#333333";

function createGrid() {
  let container = document.getElementById("container");
  let x = 5;
  document.documentElement.style.setProperty("--columns-row", x);

  for (let i = 0; i < x ** 2; i++) {
    let div = document.createElement("div");
    container.appendChild(div);
    div.addEventListener("mousedown", function () {
      this.style.backgroundColor = currentColor;
    });
  }
}
createGrid();

function setCurrentColor(newColor) {
  currentColor = newColor;
}

const colorPicker = document.getElementById("colorInput");
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
