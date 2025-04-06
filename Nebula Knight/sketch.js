const e = Math.min(innerWidth, innerHeight);
const canvas = {
  w: e,
  h: e
};

let cols;
let rows;
let rectWidth, rectHeight;
let knightPath = [];
let totalSteps;
let s1, s2;
const scaleFactor = 9 / 10;
let colormode;
let startColor;
let endColor;

function setup() {
  createCanvas(canvas.w, canvas.h);
  $fx.preview();

  colorMode(HSB, 360, 255, 255);
  noLoop();

  cols = floor($fx.rand() * 100) + 5;
  rows = floor($fx.rand() * 100) + 5;

  s1 = floor($fx.rand() * min([cols, rows]) / ($fx.rand() * 5 + 1)) + 1;
  s2 = floor($fx.rand() * min([cols, rows]) / ($fx.rand() * 5 + 1)) + 1;

  rectWidth = (width * scaleFactor) / cols;
  rectHeight = (height * scaleFactor) / rows;

  totalSteps = floor($fx.rand() * 1000) + 10;

  let startX = floor($fx.rand() * cols) + 1;
  let startY = floor($fx.rand() * rows) + 1;
  knightPath.push({ x: startX, y: startY });

  colormode=floor($fx.rand() * 5) ;

  for (let i = 0; i < totalSteps; i++) {
    let nextMove = getRandomKnightMove(knightPath[knightPath.length - 1], s1, s2);
    if (nextMove) {
      knightPath.push(nextMove);
    } else {
      break;
    }
  }
}

function draw() {
  background(255);

  let offsetX = (width - width * scaleFactor) / 2;
  let offsetY = (height - height * scaleFactor) / 2;

if (colormode==0)
  {  
  startColor = color(0, 0, 0);
  endColor = color(255, 255, 255);
}
else if (colormode==1)
  {  
  startColor = color(0, 0, 255);
  endColor = color(255, 255, 255);
}
else if (colormode==2)
  {  
  startColor = color(0, 255, 255);
  endColor = color(255, 255, 255);
}
else if (colormode==3)
  {  
  startColor = color(255, 0, 255);
  endColor = color(255, 255, 255);
}
else if (colormode==4)
  {  
  startColor = color(255, 255, 0);
  endColor = color(255, 255, 255);
}


  for (let i = 0; i < knightPath.length; i++) {
    let pos = knightPath[i];

    let px = offsetX + (pos.x - 1) * rectWidth + rectWidth / 2;
    let py = offsetY + (pos.y - 1) * rectHeight + rectHeight / 2;

    let interColor = lerpColor(startColor, endColor, i / knightPath.length);
    noFill();
    stroke(interColor);
    strokeWeight(2);

    // Randomized circle size
    let minRadius = min(s1, s2);
    let maxRadius = canvas.w / 10;
    let radius = map($fx.rand(), 0, 1, minRadius, maxRadius);

    ellipse(px, py, radius, radius);
  }
}

function getRandomKnightMove(position, Step1, Step2) {
  let { x, y } = position;
  let moves = [
    { x: x + Step1, y: y + Step2 }, { x: x + Step1, y: y - Step2 },
    { x: x - Step1, y: y + Step2 }, { x: x - Step1, y: y - Step2 },
    { x: x + Step2, y: y + Step1 }, { x: x + Step2, y: y - Step1 },
    { x: x - Step2, y: y + Step1 }, { x: x - Step2, y: y - Step1 }
  ];

  let validMoves = moves.filter(m => m.x >= 1 && m.x <= cols && m.y >= 1 && m.y <= rows);
  
  return validMoves.length > 0 ? validMoves[floor($fx.rand() * validMoves.length)] : null;
}
