// app.js — TEST MINIMAL

alert("PhysioReact app.js is loaded!");

const startBtn = document.getElementById("btn-start");
const stimulusBox = document.getElementById("stimulus-box");
const stimulusContent = document.getElementById("stimulus-content");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    stimulusContent.textContent = "TEST";
    stimulusContent.style.color = "#ffffff";
    stimulusBox.style.backgroundColor = "#0074ff";
  });
} else {
  alert("Start button not found in DOM!");
}
