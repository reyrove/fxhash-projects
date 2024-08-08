const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;

var features = {};

const minLineWidth = $fx.rand() * e / 10;
const maxLineWidth = $fx.rand() * e / 3 + minLineWidth;
let lineWidthChange = e / 10;

let time = 0;
var numberOfSineFunctions = [];
let frequencies = [];

const fibonacciSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

function setup() {
  const Backgroundcolors = ['#34282C', '#3B3131', '#0C090A', '#36454F', '#151B54', '#045F5F', '#045D5D', '#033E3E', '#25383C', '#2C3539', '#1F6357', '#555D50', '#254117', '#004225', '#665D1E', '#483C32', '#4A412A', '#473810', '#493D26', '#513B1C', '#3D3635', '#3B2F2F', '#43302E', '#622F22', '#5C3317', '#7E3517', '#800000', '#660000', '#551606', '#3F000F', '#3D0C02', '#2F0909', '#2B1B17', '#550A35', '#614051', '#583759', '#4E5180', '#483D8B', '#4B0150', '#36013F', '#2E1A47', '#736F6E', '#888B90', '#99A3A3', '#B6B6B4', '#C9C1C1', '#D1D0CE', '#DADBDD', '#F5F5F5', '#BCC6CC', '#98AFC7', '#728FCE', '#2916F5', '#1974D2', '#1589FF', '#14A3C7', '#659EC7', '#87AFC7', '#95B9C7', '#3BB9FF', '#79BAEC', '#A0CFEC', '#B4CFEC', '#C2DFFF', '#AFDCEC', '#C9DFEC', '#EBF4FA', '#F0FFFF', '#CCFFFF', '#9AFEFF', '#57FEFF', '#4EE2EC', '#8EEBEC', '#CFECEC', '#B3D9D9', '#81D8D0', '#7BCCB5', '#66CDAA', '#93E9BE', '#AAF0D1', '#01F9C6', '#40E0D0', '#46C7C7', '#20B2AA', '#00A36C', '#3EB489', '#50C878', '#7C9D8E', '#78866B', '#728C00', '#6B8E23', '#808000', '#08A04B', '#6AA121', '#8A9A5B', '#4AA02C', '#12AD2B', '#73A16C', '#6CBB3C', '#4CC417', '#54C571', '#89C35C', '#99C68E', '#A0D6B4', '#8FBC8F', '#829F82', '#A2AD9C', '#B8BC86', '#9CB071', '#8FB31D', '#B0BF1A', '#77DD77', '#5EFB6E', '#00FA9A', '#12E193', '#00FF00', '#ADF802', '#DAEE01', '#CCFB5D', '#90EE90', '#E3F9A6', '#DBF9DB', '#E8F1D4'];
  const BackgroundIndex = Math.floor($fx.rand() * Backgroundcolors.length);

  features.backgroundColour = Backgroundcolors[BackgroundIndex];
  features.NumberOfLines = $fx.rand() * 350 + 50;

  features.lineWidth = [];
  features.lineColor = [];
  numberOfSineFunctions = Math.floor($fx.rand() * 25 + 1);

  let baseHue = Math.floor($fx.rand() * 360); // Random base hue
  for (let lineX = 0; e > 0 && lineX < e; lineX += e / features.NumberOfLines) {
    let lineWidth = $fx.rand() * (maxLineWidth - minLineWidth) + minLineWidth;
    lineWidth += $fx.rand() * (2 * lineWidthChange) - lineWidthChange;
    if (lineWidth < minLineWidth) {
      lineWidth = minLineWidth;
    } else if (lineWidth > maxLineWidth) {
      lineWidth = maxLineWidth;
    }
    features.lineWidth.push(lineWidth);

    // Generating analogous colors
    let hue = (baseHue + $fx.rand() * 60 - 30) % 360; // Variation within 30 degrees on either side of the base hue
    let saturation = 80 + $fx.rand() * 20; // Saturation between 80% and 100%
    let lightness = 50 + $fx.rand() * 20; // Lightness between 50% and 70%

    features.lineColor.push([hue, saturation, lightness]);
  }

  features.Direction = Math.floor($fx.rand() * 2);
  features.Range = $fx.rand() * (e / 2 - maxLineWidth);

  // Initialize frequencies for the sine functions using random values from the Fibonacci sequence
  for (let i = 0; i < numberOfSineFunctions; i++) {
    frequencies.push(fibonacciSequence[Math.floor($fx.rand() * fibonacciSequence.length)]);
  }

  let cnv = createCanvas(e, e);
  cnv.parent('canvas-container'); // Attach canvas to the container
  frameRate(30); // Higher frame rate for smoother animation

  loop(); // Start the animation loop immediately
}

function draw() {
  background(features.backgroundColour);

  // Add illusion of motion to a random side
  const motionStep = 0.5;
  const directions = [
    { x: motionStep, y: 0 },
    { x: -motionStep, y: 0 },
    { x: 0, y: motionStep },
    { x: 0, y: -motionStep },
  ];
  const randomDirection = directions[Math.floor($fx.rand() * directions.length)];
  translate(randomDirection.x, randomDirection.y);

  if (features.Direction == 0) {
    translate(0, e / 2);
  } else if (features.Direction == 1) {
    rotate(Math.PI / 2);
    translate(0, -e / 2);
  }

  for (let j = 0; j < features.lineWidth.length; j++) {
    let lineX = j * e / features.NumberOfLines;

    strokeWeight(e / features.NumberOfLines);
    let [r, g, b] = HSLToRGB(features.lineColor[j][0], features.lineColor[j][1], features.lineColor[j][2]);
    stroke(r, g, b);
    features.lineColor[j] = harmoniousColorChange(features.lineColor[j]);

    let sumOfSines = 0;
    for (let i = 0; i < numberOfSineFunctions; i++) {
      sumOfSines += Math.sin(frequencies[i] * lineX * 2 * Math.PI / e + time);
    }

    let startY = features.Range * sumOfSines / numberOfSineFunctions - features.lineWidth[j];
    let endY = features.Range * sumOfSines / numberOfSineFunctions + features.lineWidth[j];

    line(lineX, startY, lineX, endY);

    features.lineWidth[j] += e / 200 * ($fx.rand() < 0.5 ? -1 : 1);
    if (features.lineWidth[j] < minLineWidth) {
      features.lineWidth[j] = minLineWidth;
    } else if (features.lineWidth[j] > maxLineWidth) {
      features.lineWidth[j] = maxLineWidth;
    }
  }

  resetMatrix();
  time += 0.05; // Adjust this value to control the speed of the animation
  $fx.preview();
}

function harmoniousColorChange(color) {
  const changeAmount = 5;
  color[2] += changeAmount * ($fx.rand() < 0.5 ? -1 : 1); // Adjusting the lightness
  color[2] = constrain(color[2], 40, 80); // Constrain lightness to maintain harmony
  return color;
}

function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

// Initialize the canvas and setup
setup();
