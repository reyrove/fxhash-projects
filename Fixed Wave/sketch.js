const e = Math.min(innerWidth, innerHeight);
const canvas = { w: e, h: e };

let prev, current, next;
let dt, c;
let cols, rows;
let rectWidth, rectHeight;
let scaleFactor;
let offsetX, offsetY;
let backgroundColor;
let q;

let oscillatingPoint;
let startColor, endColor;

const palette = {
  red:       [255, 0, 0],
  blue:      [0, 0, 255],
  yellow:    [255, 255, 0],
  green:     [0, 255, 0],
  black:     [0, 0, 0],
  cyan:      [0, 255, 255],
  white:     [255, 255, 255],
  magenta:   [255, 0, 255],
  orange:    [255, 165, 0],
  purple:    [128, 0, 128],
  pink:      [255, 105, 180],
  teal:      [0, 128, 128],
  navy:      [0, 0, 128],
  maroon:    [128, 0, 0],
  olive:     [128, 128, 0],
  beige:     [245, 245, 220],
};

function setup() {
  pixelDensity(1); // Prevent rendering artifacts on high-DPI displays
  createCanvas(canvas.w, canvas.h);
  noStroke(); // Disable all strokes

  let colorNames = Object.keys(palette);
  let startIndex = floor($fx.rand() * colorNames.length);
  let endIndex;
  do {
    endIndex = floor($fx.rand() * colorNames.length);
  } while (endIndex === startIndex);

  startColor = palette[colorNames[startIndex]];
  endColor = palette[colorNames[endIndex]];

  scaleFactor = 1;
  cols = floor($fx.rand() * 150 + 10);
  rows = floor($fx.rand() * 10 + cols - 5);
  dt = $fx.rand() * 0.01 + 0.005;
  c = $fx.rand() * e / 10 + e / 10;
  rectWidth = (e * scaleFactor) / cols;
  rectHeight = (e * scaleFactor) / rows;
  offsetX = 0;
  offsetY = 0;
  backgroundColor = startColor;

  prev = new Array(cols).fill().map(() => new Array(rows).fill(0));
  current = new Array(cols).fill().map(() => new Array(rows).fill(0));
  next = new Array(cols).fill().map(() => new Array(rows).fill(0));
  q = 0;

  let i = floor($fx.rand() * (cols-2)+1);
  let j = floor($fx.rand() * (rows-2)+1);
  let freq = floor($fx.rand() * 300 + 10);
  oscillatingPoint = { i, j, freq, time: 0 };
}

function draw() {
  q += 1;
  background(backgroundColor);
  updateWave();
  drawWave();

  if (q == 500) {
    $fx.preview();
    console.log(q)
  }
}

function updateWave() {
  const dx2 = rectWidth * rectWidth;
  const dy2 = rectHeight * rectHeight;
  const coeff = (c * c * dt * dt);

  let p = oscillatingPoint;
  let oscillationValue = sin(p.time * p.freq * TWO_PI) * 450;
  current[p.i][p.j] += oscillationValue;

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

  // Fixed boundaries
  for (let i = 0; i < cols; i++) {
    next[i][0] = 0;
    next[i][rows - 1] = 0;
  }
  for (let j = 0; j < rows; j++) {
    next[0][j] = 0;
    next[cols - 1][j] = 0;
  }

  // Swap buffers
  let temp = prev;
  prev = current;
  current = next;
  next = temp;

  oscillatingPoint.time += dt;
}

function getGradientColor(normValue) {
  normValue = constrain(normValue, 0, 1);

  let r = lerp(startColor[0], endColor[0], normValue);
  let g = lerp(startColor[1], endColor[1], normValue);
  let b = lerp(startColor[2], endColor[2], normValue);

  let alpha = 100 + 155 * normValue;

  return {
    r: Math.min(255, r),
    g: Math.min(255, g),
    b: Math.min(255, b),
    a: Math.min(255, alpha)
  };
}

function drawWave() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let normValue = map(current[i][j], -450, 450, 0, 1);
      let col = getGradientColor(normValue);

      fill(col.r, col.g, col.b, col.a);
      rect(
        i * rectWidth + offsetX,
        j * rectHeight + offsetY,
        rectWidth,
        rectHeight
      );
    }
  }
}
