// Grab the elements from the HTML
const circle = document.getElementById("circle");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const startBtn = document.getElementById("start-btn");

// Update the circle color from the slider values
function updateColor() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  circle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Run whenever any slider moves
redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

// Button click: do something with the chosen color
startBtn.addEventListener("click", () => {
  const color = circle.style.backgroundColor || "rgb(255, 102, 0)";
  console.log("Chosen color:", color);
  // Later: use the color to pick a playlist, or go to another page, e.g.
  // window.location.href = "playlist.html";
});

// Set the starting color
updateColor();