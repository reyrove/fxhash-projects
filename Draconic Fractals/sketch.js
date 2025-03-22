const e = Math.min(innerWidth, innerHeight);
const canvas = {
  w: e,
  h: e
};

let order; 
let length; 
let segments = [];
function setup() {
  createCanvas(canvas.w, canvas.h);
  $fx.preview();

  colorMode(HSB, 360, 255, 255);
  noLoop();

  order = Math.floor($fx.rand() * 6 + 5); 
  length = canvas.w / pow(2, order / 2); 

  generateDragonTiling(order);

  normalizeSegments();
}
function draw() {
  background(0);

  let palette = generatePalette(); 
  strokeWeight(canvas.w * 0.001); 
  noFill(); 

  for (let i = 0; i < segments.length; i++) {
    let segment = segments[i];
    stroke(palette[i % palette.length]);

    let control1 = segment.a.copy().add(p5.Vector.sub(segment.b, segment.a).mult(0.25));
    let control2 = segment.a.copy().add(p5.Vector.sub(segment.b, segment.a).mult(0.75)); 

    beginShape();
    curveVertex(segment.a.x, segment.a.y);
    curveVertex(control1.x, control1.y);
    curveVertex(control2.x, control2.y);
    curveVertex(segment.b.x, segment.b.y);
    endShape();
  }
}
function generateDragonTiling(order) {
  const size = pow(2, order / 2); 
  const tileLength = length; 

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {

      let blackTile = (x + y) % Math.floor($fx.rand() * 5 + 1) === 0;
      let tileOrigin = createVector(x * tileLength, y * tileLength);
      if (blackTile) {
        addDragonSegment(tileOrigin, tileLength, true); 
      } else {
        addDragonSegment(tileOrigin, tileLength, false); 
      }
    }
  }
}
function addDragonSegment(origin, tileLength, vertical) {
  let start = vertical
    ? origin.copy().add(tileLength / 2, 0)
    : origin.copy().add(0, tileLength / 2);
  let end = vertical
    ? origin.copy().add(tileLength / 2, tileLength)
    : origin.copy().add(tileLength, tileLength / 2);

  generateDragonCurve(order, start, end);
}
function generateDragonCurve(order, start, end) {
  if (order === 0) {
    segments.push({ a: start, b: end });
    return;
  }

  let mid = createVector(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2
  );
  let dx = (end.x - start.x) / 2;
  let dy = (end.y - start.y) / 2;

  let newMid = createVector(mid.x - dy, mid.y + dx); 

  generateDragonCurve(order - 1, start, newMid);
  generateDragonCurve(order - 1, newMid, end);
}
function normalizeSegments() {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (let seg of segments) {
    minX = min(minX, seg.a.x, seg.b.x);
    minY = min(minY, seg.a.y, seg.b.y);
    maxX = max(maxX, seg.a.x, seg.b.x);
    maxY = max(maxY, seg.a.y, seg.b.y);
  }

  let scaleX = canvas.w / (maxX - minX);
  let scaleY = canvas.h / (maxY - minY);
  let scaleFactor = min(scaleX, scaleY);

  for (let seg of segments) {
    seg.a.x = (seg.a.x - minX) * scaleFactor;
    seg.a.y = (seg.a.y - minY) * scaleFactor;
    seg.b.x = (seg.b.x - minX) * scaleFactor;
    seg.b.y = (seg.b.y - minY) * scaleFactor;
  }
}
function generatePalette() {
  let baseHue = $fx.rand() * 360;
  return [
    color(baseHue, 200, 255),
    color((baseHue + $fx.rand() * 60) % 360, 200, 255),
    color((baseHue + $fx.rand() * 120) % 360, 200, 255),
    color((baseHue + $fx.rand() * 180) % 360, 200, 255),
  ];
}
