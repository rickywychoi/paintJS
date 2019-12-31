const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

const toggleEraserBtn = document.getElementById('jsEraser');
const erasers = document.getElementsByClassName("controls_eraser");
const colors = document.getElementsByClassName("controls_color");

canvas.width = 800; // width of canvas set in css
canvas.height = 500; // height of canvas set in css

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 15.0;
let lastStrokeStyle = "#2c2c2c";
let lastLineWidth = 15.0;

let painting = false;
let isEraser = false;
console.log("initial isEraser: " + isEraser);

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

const doPainting = () => {
  painting = true;
}

const stopPainting = () => {
  painting = false;
}

// toggle eraser
const toggleEraser = () => {
  isEraser = !isEraser;
  if (isEraser) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 20;
    toggleEraserBtn.style.border = "7px solid rgb(21, 157, 251)";
    for (let i = 0; i < erasers.length; i++) {
      erasers[i].style.cursor = "pointer";
    }
  } else {
    ctx.strokeStyle = lastStrokeStyle;
    ctx.lineWidth = lastLineWidth;
    toggleEraserBtn.style.border = "2px solid rgba(0, 0, 0, 0.18)";
    unHighlightErasers();
    for (let i = 0; i < erasers.length; i++) {
      erasers[i].style.cursor = "not-allowed";
    }
  }
  console.log("isEraser: " + isEraser);
  console.log("stroke: " + ctx.lineWidth);
  console.log("lastLineWidth: " + lastLineWidth);
}

// for changing eraser sizes
const changeEraser = (event) => {
  if (isEraser) {
    ctx.strokeStyle = "#fff";
    if (ctx.strokeStyle == "#ffffff" || ctx.strokeStyle == "#fff" || ctx.strokeStyle == "rgb(255, 255, 255)") {
      switch (event.target.id) {
        case "e_xs":
          ctx.lineWidth = 3;
          break;
        case "e_s":
          ctx.lineWidth = 8;
          break;
        case "e_m":
          ctx.lineWidth = 17;
          break;
        case "e_l":
          ctx.lineWidth = 40;
          break;
        case "e_xl":
          ctx.lineWidth = 70;
          break;
        default:
          return;
      }
    }
    unHighlightErasers();
    if (isEraser) {
      event.target.style.border = "7px solid rgb(21, 157, 251)";
    } else {
      event.target.style.border = "none";
    }
  }
}

const unHighlightErasers = () => {
  for (let i = 0; i < erasers.length; i++) {
    erasers[i].style.border = "none";
  }
}

Array.from(erasers).forEach(eraserBtn => {
  eraserBtn.addEventListener("click", changeEraser);
});

// for changing painting colors
const changeColor = (event) => {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
  lastStrokeStyle = event.target.style.backgroundColor;
  if (!isEraser) {
    lastStrokeStyle = ctx.strokeStyle // saving previous strokeStyle
    lastLineWidth = ctx.lineWidth; // saving previous lineWidth
  }
  ctx.strokeStyle = lastStrokeStyle // implementing previous strokeStyle
  ctx.lineWidth = lastLineWidth; // implementing previous lineWidth
  unHighlightColors();
  event.target.style.border = "7px solid rgb(21, 157, 251)";
  console.log("changed Color; stroke: " + ctx.lineWidth);
}

const unHighlightColors = () => {
  for (let i = 0; i < colors.length; i++) {
    colors[i].style.border = "none";
  }
}

Array.from(colors).forEach(colorBtn => {
  colorBtn.addEventListener("click", changeColor);
});

const changeLineWidth = (val) => {
  ctx.lineWidth = val;
}

const fillWithColor = () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const clearCanvas = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", doPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
