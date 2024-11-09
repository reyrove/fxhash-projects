let startX;
let startY;
let endX;
let endY;

let deltaStartX;
let deltaStartY;
let deltaEndX;
let deltaEndY;

let r;
let g;
let b;

let Shape;

function setup() {
  // Dynamic canvas size based on screen dimensions
  const e = Math.min(window.innerWidth, window.innerHeight);
  createCanvas(e, e);
  
  // Generate a single dark background color for contrast
  let bgColor = color($fx.rand() * 256, $fx.rand() * 256, $fx.rand() * 256);
  background(bgColor);

  // Initial random positions for line endpoints
  startX = $fx.rand() * width;
  startY = $fx.rand() * height;
  endX = $fx.rand() * width;
  endY = $fx.rand() * height;

  // Small random deltas for movement in each direction, scaled to canvas size
  const range = 0.2 *$fx.rand() * width; // Small range relative to the canvas size
  deltaStartX = ($fx.rand() * range * 2) - range; // Range between -range and range
  deltaStartY = ($fx.rand() * range * 2) - range;
  deltaEndX = ($fx.rand() * range * 2) - range;
  deltaEndY = ($fx.rand() * range * 2) - range;

  // Set initial neon color for lines, scaled to bright neon colors
  r = $fx.rand() * 65 + 190; // Random value between 200 and 255
  g = $fx.rand() * 65 + 190; // Random value between 200 and 255
  b = $fx.rand() * 75 + 180; // Random value between 200 and 255

  Shape=Math.floor($fx.rand()*3);

  noFill();

  // Draw multiple lines for a vibrant static effect
  const numLines = Math.floor($fx.rand() * 200) + 100; // Random number of lines between 500 and 1500
  for (let i = 0; i < numLines; i++) {
    // Randomize the stroke color for a neon effect
    stroke(r, g, b);
    strokeWeight($fx.rand() * width/500 + width/1000); // Vary line thickness between 0.5 and 2.0
    if (Shape==0){
      line(startX, startY, endX, endY);
    }
    else if(Shape==1){
      ellipse(startX, startY, endX, endY);

    }
    else if(Shape==2){
  rect(startX, startY, endX, endY);

}

    // Slightly adjust color for gradient effect across lines
    r += ($fx.rand() * 20) - 10; // Adjust within a range of -10 to +10
    g += ($fx.rand() * 20) - 10; // Adjust within a range of -10 to +10
    b += ($fx.rand() * 20) - 10; // Adjust within a range of -10 to +10

    // Constrain colors within neon range
    r = constrain(r, 150, 255);
    g = constrain(g, 150, 255);
    b = constrain(b, 150, 255);

    // Update positions with small movements
    startX += deltaStartX;
    startY += deltaStartY;
    endX += deltaEndX;
    endY += deltaEndY;

    // Reverse direction if out of bounds to keep lines within canvas
    if (startX < 0 || startX > width) deltaStartX *= -1;
    if (startY < 0 || startY > height) deltaStartY *= -1;
    if (endX < 0 || endX > width) deltaEndX *= -1;
    if (endY < 0 || endY > height) deltaEndY *= -1;
  }
  
  // Trigger the capture module for preview
  $fx.preview();
}

function draw() {
  // Nothing needed in draw because the art is generated statically in setup
}









































