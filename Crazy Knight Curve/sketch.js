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

function setup() {
  createCanvas(canvas.w, canvas.h);
  $fx.preview();

  colorMode(HSB, 360, 255, 255);
  noLoop();

  cols = floor($fx.rand() * 300) + 5;
  rows = cols;

  s1 = floor($fx.rand() * min([cols, rows]) / ($fx.rand() * 9 + 1))+1;
  s2 = floor($fx.rand() * s1) ;

  rectWidth = (width * scaleFactor) / cols;
  rectHeight = (height * scaleFactor) / rows;

  totalSteps = floor($fx.rand() * (cols * rows + 2000) / ($fx.rand() * 99 + 1)) + 10;  

  let startX = floor($fx.rand() * cols) + 1;
  let startY = floor($fx.rand() * rows) + 1;
  knightPath.push({ x: startX, y: startY });

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

  stroke(0);
  strokeWeight(0.5);
  noFill();

  let offsetX = (width - width * scaleFactor) / 2;
  let offsetY = (height - height * scaleFactor) / 2;

  beginShape();
  for (let i = 0; i < knightPath.length; i++) {
    let pos = knightPath[i];
    let px = offsetX + (pos.x - 1) * rectWidth + rectWidth / 2;
    let py = offsetY + (pos.y - 1) * rectHeight + rectHeight / 2;
    
    curveVertex(px, py);
  }
  endShape();
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
