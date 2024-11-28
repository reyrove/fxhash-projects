const e = Math.min(innerWidth, innerHeight);
const canvas = {
  w: e,
  h: e
};

let order;
let curveType;
let N, total;
let path = [];

function setup() {
  createCanvas(canvas.w, canvas.h);
  // Call $fx.preview() to trigger the capture module for generating previews
  $fx.preview();

  colorMode(HSB, 360, 255, 255);
  noLoop();

  // Randomize curve order using $fx.rand() for consistency
  order = int($fx.rand() * 4 + 4); // Curve complexity (4-8)
  curveType = 'hilbert'; // Always use Hilbert curve

  // Generate path based on the Hilbert curve type
  path = [];
  N = int(pow(2, order)); // Grid size is 2^order
  total = N * N; // Total points in the curve

  for (let i = 0; i < total; i++) {
    if (curveType === 'hilbert') path.push(hilbert(i));
  }

  // Scale paths to fit the canvas
  let len = canvas.w / N; // Dynamically set path size based on canvas
  for (let p of path) {
    p.mult(len);
    p.add(len / 2, len / 2); // Centered paths
  }
}

function draw() {
  // Random dark HSB color for background using $fx.rand()
  background($fx.rand() * 360, 255, $fx.rand() * 40 + 60); 

  // Randomized styles using $fx.rand()
  let palette = generatePalette();
  let strokeRatio = 0.002; // Ratio of stroke weight to canvas size
  strokeWeight(canvas.w * (0.003 + $fx.rand() * 0.01)); 
  noFill();

  push();
  beginShape();
  for (let i = 0; i < path.length - 1; i++) {
    // Select a color from palette based on $fx.rand()
    stroke(palette[int($fx.rand() * palette.length)]); 
    if ($fx.rand() > 0.6) { // Occasionally break the line
      endShape();
      beginShape();
    }
    vertex(path[i].x, path[i].y);
  }
  endShape();
  pop();

  // Add optional transformations
  if ($fx.rand() > 0.5) applyTransformation(canvas.w, canvas.h);
}

// Generate a random harmonious palette
function generatePalette() {
  let baseHue = $fx.rand() * 360; // Random base hue
  return [
    color(baseHue, 200, 255),
    color((baseHue + $fx.rand() * 60) % 360, 200, 255),
    color((baseHue + $fx.rand() * 120) % 360, 200, 255),
    color((baseHue + $fx.rand() * 180) % 360, 200, 255),
  ];
}

// Hilbert curve logic
function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0),
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index === 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index === 1) {
      v.y += len;
    } else if (index === 2) {
      v.x += len;
      v.y += len;
    } else {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}

// Apply transformations to the curve
function applyTransformation(w, h) {
  translate(w / 2, h / 2);
  rotate($fx.rand() * PI / 4); // Random rotation
  scale($fx.rand() * 1.5 + 0.5); // Random scale
}













