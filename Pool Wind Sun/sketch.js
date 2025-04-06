const e = Math.min(innerWidth, innerHeight);
const canvas = { w: e, h: e };

let matrixA, matrixL, matrixU, matrixP;
let prev, current, next;
let dt, c, maxTime;
let cols, rows;
let rectWidth, rectHeight;
let oscillatingPoints = [];

let scaleFactor;
let offsetX, offsetY;
let backgroundColor;

function setup() {
  createCanvas(canvas.w, canvas.h);
  $fx.preview();

  // Precompute all randomness
  scaleFactor = $fx.rand() * 0.25 + 0.75;
  cols = floor($fx.rand() * 50 + 350);
  rows = floor($fx.rand() * 20 + cols - 10);
  dt = $fx.rand() * 0.02 + 0.04;
  c = $fx.rand() * e/80 + e/200;
  maxTime = floor($fx.rand() * 40 + 30);
  rectWidth = (width * scaleFactor) / cols;
  rectHeight = (height * scaleFactor) / rows;
  offsetX = (width * (1 - scaleFactor)) / 2;
  offsetY = (height * (1 - scaleFactor)) / 2;
  backgroundColor = floor($fx.rand() * 200) + 30;

  prev = new Array(cols).fill().map(() => new Array(rows).fill(0));
  current = new Array(cols).fill().map(() => new Array(rows).fill(0));
  next = new Array(cols).fill().map(() => new Array(rows).fill(0));

  matrixA = new Array(cols).fill().map(() => new Array(rows).fill(0));
  matrixL = new Array(cols).fill().map(() => new Array(rows).fill(0));
  matrixU = new Array(cols).fill().map(() => new Array(rows).fill(0));
  matrixP = new Array(cols).fill().map(() => new Array(rows).fill(0));

  let numOscillators = floor($fx.rand() * 0.002 * cols * rows + 1);
  for (let k = 0; k < numOscillators; k++) {
    let i = floor($fx.rand() * cols);
    let j = floor($fx.rand() * rows);
    let freq = floor($fx.rand() * 50 + 10);
    oscillatingPoints.push({ i, j, freq });
  }

  simulateWave(maxTime);
  drawWave();
}

function simulateWave(targetTime) {
  let time = 0;
  let dx2 = rectWidth * rectWidth;
  let dy2 = rectHeight * rectHeight;
  let coeff = (c * c * dt * dt);

  while (time < targetTime) {
    for (let p of oscillatingPoints) {
      let oscillationValue = sin(time * p.freq * TWO_PI) * 450;
      current[p.i][p.j] += oscillationValue;
    }

    for (let i = 1; i < cols - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        next[i][j] =
          2 * current[i][j] - prev[i][j] +
          coeff * (
            (current[i + 1][j] + current[i - 1][j] - 2 * current[i][j]) / dx2 +
            (current[i][j + 1] + current[i][j - 1] - 2 * current[i][j]) / dy2
          );
      }
    }

    for (let i = 0; i < cols; i++) {
      next[i][0] = next[i][1];
      next[i][rows - 1] = next[i][rows - 2];
    }
    for (let j = 0; j < rows; j++) {
      next[0][j] = next[1][j];
      next[cols - 1][j] = next[cols - 2][j];
    }

    let temp = prev;
    prev = current;
    current = next;
    next = temp;

    time += dt;
  }
}

function getGradientColor(i, j, normValue) {
  const xRatio = i / (cols - 1);
  const yRatio = j / (rows - 1);

  let baseR = 10 + 40 * yRatio;
  let baseG = 180 + 75 * (1 - yRatio);
  let baseB = 200 + 55 * xRatio;

  if (normValue > 0.5) {
    baseR += (255 - baseR) * 0.3;
    baseG += (255 - baseG) * 0.3;
    baseB += (255 - baseB) * 0.3;
  }

  let alpha = 100 + 155 * normValue;

  return {
    r: Math.min(255, baseR),
    g: Math.min(255, baseG),
    b: Math.min(255, baseB),
    a: Math.min(255, alpha)
  };
}

function drawWave() {
  background(backgroundColor);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let normValue = map(current[i][j], -450, 450, 0, 1);
      let col = getGradientColor(i, j, normValue);

      noStroke();
      fill(col.r, col.g, col.b, col.a);
      rect(i * rectWidth + offsetX, j * rectHeight + offsetY, rectWidth + 0.5, rectHeight + 0.5);
    }
  }
}
