const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;
const mm = e * 0.001;
let nextFrame = null;
const features = {};
const isMob = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent);

var Points = [];
var DecidedRange=[];
var step = [];
var coeff = [];
var LiNewidth=[];
var Angle=0;
var Rot=[];

definitions = [
  {
    id: "number_id1",
    name: "Number of Control Points",
    type: "number",
    options: {         // optional
      min: 3,
      max: 30,
      step: 1,
    },
  }
  ]

  $fx.params(definitions)
  
function setup() {
  createCanvas(e, e);
  frameRate(30);

  const backgroundColours = ['#B6B6B4', '#F5F5F5', '#728FCE', '#2F539B', '#0909FF', '#045D5D', '#006A4E',
    '#808000', '#3A5F0B', '#254117', '#004225', '#622F22', '#A0522D', '#EB5406',
    '#FD1C03', '#660000', '#560319', '#550A35', '#583759', '#4B0150', '#2E1A47',
    '#800080', '#342D7E', '#C11B17', '#804A00', '#665D1E', '#347C17', '#2C3539'];

  const backgroundNames = ['Gray Cloud', 'WhiteSmoke (W3C)', 'Light Purple Blue', 'Estoril Blue', 'Bright Blue', 'Dark Teal', 'Bottle Green',
    'Olive (W3C)', 'Green Leaves', 'Dark Forest Green', 'Lotus Green', 'Red Brown', 'Sienna (W3C)', 'Red Gold',
    'Neon Red', 'Red Blood', 'Dark Scarlet', 'Purple Lily', 'Plum Purple', 'Dark Purple', 'Midnight Purple',
    'Purple (W3C)', 'Blue Whale', 'Chilli Pepper', 'Dark Bronze', 'Antique Bronze', 'Shamrock Green', 'Gunmetal'];

  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length);

  const foregroundColours = ['#16E2F5', '#01F9C6', '#2E8B57', '#50C878', '#728C00', '#52D017', '#B0BF1A',
    '#59E817', '#DAEE01', '#FFFF00', '#FFBF00', '#E9AB17', '#FF8C00', '#F67280',
    '#FD1C03', '#810541', '#F8B88B', '#F778A1', '#F535AA', '#F433FF', '#5865F2',
    '#B041FF', '#FBFBF9', '#FF1493', '#CA762B', '#D4A017', '#E1AD01', '#98F516'];

  const foregroundNames = ['Bright Turquoise', 'Bright Teal', 'SeaGreen (W3C)', 'Emerald', 'Venom Green', 'Pea Green', 'Acid Green',
    'Nebula Green', 'Neon Yellow Green', 'Yellow (W3C)', 'Amber', 'Bee Yellow', 'DarkOrange (W3C)', 'Pastel Red',
    'Neon Red', 'Purple Maroon', 'Pastel Orange', 'Carnation Pink', 'Neon Pink', 'Bright Neon Pink', 'Blurple',
    'Purple Daffodil', 'Cotton', 'DeepPink (W3C)', 'Pumpkin Pie', 'Orange Gold', 'Mustard', 'Aloe Vera Green'];

  const foregroundIndex1 = Math.floor($fx.rand() * foregroundColours.length);
  const foregroundIndex2 = Math.floor($fx.rand() * foregroundColours.length);

  features.backgroundColour = backgroundColours[backgroundIndex];
  features.foregroundColour1 = foregroundColours[foregroundIndex1];
  features.foregroundColour2 = foregroundColours[foregroundIndex2];

  const numberOfPoints=$fx.getParam('number_id1');

  Points = generateRandomPoints(numberOfPoints);
  DecidedRange=generateRandomNumbers(numberOfPoints, e/10, 2*e/5)
  step=generateRandomNumbers(numberOfPoints, -e/100, e/100)
  coeff=generateRandomBinaryVector(numberOfPoints)
  LiNewidth=$fx.rand()*e/200+e/200;
  Rot=Math.PI/Math.floor($fx.rand()*160+20)*( $fx.rand() < 0.5 ? -1 : 1);

  const readableFeaturesObj = {};
  readableFeaturesObj['Background Color'] = backgroundNames[backgroundIndex];
  readableFeaturesObj['Number of control Points']= numberOfPoints
  readableFeaturesObj['Line gradient Color 1']=foregroundNames[foregroundIndex1];
  readableFeaturesObj['Line gradient Color 2']=foregroundNames[foregroundIndex2];

  console.table(readableFeaturesObj);

  (isMob) ? pixelDensity(1) : pixelDensity(Math.min(window.devicePixelRatio, 2));
}

function ChangePointsLocation(Points, step, decidedRange) {
  for (let i = 0; i < Points.length; i++) {
    if (Points[i][3] >= decidedRange[i]) {
      Points[i][3] = 0;
      coeff[i] = -coeff[i];
    }

    if (Points[i][3] <= decidedRange[i]) {
      Points[i][0] = Points[i][0] + coeff[i] * step[i] * Math.cos(Points[i][2]);
      Points[i][1] = Points[i][1] + coeff[i] * step[i] * Math.sin(Points[i][2]);
      Points[i][3] = Points[i][3] + Math.abs(step[i]);
    }
  }
  return Points;
}

function generateRandomBinaryVector(size) {
  let binaryVector = [];
  for (let i = 0; i < size; i++) {
    // Generate a random number between 0 and 1, and assign either 1 or -1
    let randomValue = $fx.rand() < 0.5 ? -1 : 1;
    binaryVector.push(randomValue);
  }
  return binaryVector;
}

function generateRandomNumbers(size, minValue, maxValue) {
  let randomNumbers = [];
  for (let i = 0; i < size; i++) {
    let randomNumber = $fx.rand()*(maxValue-minValue)+minValue;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

function drawSmoothClosedBezierCurve(points, lineWidth, startColorHex, endColorHex) {
  if (points.length < 3) {
    console.error("At least three points are required to draw a closed curve.");
    return;
  }

  noFill();
  strokeWeight(lineWidth);

  let startColor = color(startColorHex);
  let endColor = color(endColorHex);

  let totalSegments = (points.length + 1) * 100; // Total number of small segments
  let midSegment = totalSegments / 2;

  for (let i = 0; i < points.length; i++) {
    let nextIndex = (i + 1) % points.length;
    let xc1 = (points[i][0] + points[nextIndex][0]) / 2;
    let yc1 = (points[i][1] + points[nextIndex][1]) / 2;

    let prevIndex = (i - 1 + points.length) % points.length;
    let xc0 = (points[i][0] + points[prevIndex][0]) / 2;
    let yc0 = (points[i][1] + points[prevIndex][1]) / 2;

    for (let j = 0; j < 100; j++) {
      let t = j / 100;

      let x0 = lerp(xc0, points[i][0], t);
      let y0 = lerp(yc0, points[i][1], t);
      let x1 = lerp(points[i][0], xc1, t);
      let y1 = lerp(points[i][1], yc1, t);
      let x = lerp(x0, x1, t);
      let y = lerp(y0, y1, t);

      let nextT = (j + 1) / 100;
      let nextX0 = lerp(xc0, points[i][0], nextT);
      let nextY0 = lerp(yc0, points[i][1], nextT);
      let nextX1 = lerp(points[i][0], xc1, nextT);
      let nextY1 = lerp(points[i][1], yc1, nextT);
      let nextX = lerp(nextX0, nextX1, nextT);
      let nextY = lerp(nextY0, nextY1, nextT);

      let segmentIndex = i * 100 + j;
      let interColor;
      if (segmentIndex < midSegment) {
        interColor = lerpColor(startColor, endColor, segmentIndex / midSegment);
      } else {
        interColor = lerpColor(endColor, startColor, (segmentIndex - midSegment) / midSegment);
      }

      stroke(interColor);
      line(x, y, nextX, nextY);
    }
  }
}



function generateRandomPoints(n) {
  if (n <= 2) {
    console.error("Input number must be greater than 2.");
    return [];
  }

  let points = [];
  let angleIncrement = TWO_PI / n;
  let centerX = 0;
  let centerY = 0;
  let maxRadius = canvas.w /3;

  for (let i = 0; i < n; i++) {
    let startAngle = i * angleIncrement;

    // Random angle and radius within the sector
    let angle = $fx.rand() * angleIncrement + startAngle;
    let radius = $fx.rand()* maxRadius;

    // Convert polar coordinates to Cartesian coordinates
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    let rangeOfPoint = 0;

    points.push([x, y, angle, rangeOfPoint]);
  }

  return points;
}

function draw() {
  Angle=Angle+Rot;
  background(features.backgroundColour);
  translate(e / 2, e / 2);
  rotate(Angle)

  Points = ChangePointsLocation(Points, step, DecidedRange);
  drawSmoothClosedBezierCurve(Points, LiNewidth, features.foregroundColour1,features.foregroundColour2);

  resetMatrix();

  if (frameCount === 1) {
    $fx.preview();
    // Call to any preview function if needed, like $fx.preview();
  }
}

function keyPressed() {
  if (key === 's' || 'S') {
    saveGif('Bezier 2',30);
  }
}


