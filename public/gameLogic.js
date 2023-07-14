const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// array of colors to use for stroke and background
const colors = ['lightpink', 'lightblue', 'lavender', 'mintgreen', 'lightyellow', 'peachpuff', 'lightcoral'];
const backgroundColors = ['darkred', 'darkblue', 'darkgreen', 'darkmagenta', 'darkcyan', 'darkolivegreen', 'darkslategray'];
let currentColorIndex = 0;

// function to change the stroke and background color
function changeColor() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  ctx.strokeStyle = colors[currentColorIndex];
  canvas.style.backgroundColor = backgroundColors[(currentColorIndex + 1) % backgroundColors.length];
}

// change the color every 2 seconds
setInterval(changeColor, 2000);

let lineWidth = 1; // starting line width

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineWidth = lineWidth
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  lineWidth += 3;
 });

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});