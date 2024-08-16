const e = Math.min(innerWidth, innerHeight);
const canvas = { w: e, h: e };

const features = {};

function setup() {
  createCanvas(e, e);
  background(255);
  noLoop();
  drawElliottWaves();
  
  const readableFeaturesObj = {};
  console.table(readableFeaturesObj);
  $fx.features(readableFeaturesObj);
}

function draw() {}

function drawElliottWaves() {
  let wavePoints = [];
  let numDays = 360;
  let numWeeks = Math.floor(numDays / 7);
  let numMonths = Math.ceil(numDays / 30); // Estimate number of months

  let fixedGap = e / 10; // Fixed left and right gap
  let totalWaveWidth = e - 2 * fixedGap; // Calculate the total available width for waves
  let waveHeight = e/25; // Adjusted height for better visibility
  let waveWidth = totalWaveWidth / numDays; // Width per day
  
  let x = fixedGap; // Start from the left margin
  let y = height / 2;

  // Generate points for Elliott Waves
  for (let i = 0; i < numDays; i++) {
    let direction = (i % 2 === 0) ? random(-1, 0) : random(0, 1); // Random direction
    y += direction * waveHeight * (0.8 + $fx.rand() * 0.4); // Random height variation
    wavePoints.push({ x: x, y: y });
    x += waveWidth * (0.8 + $fx.rand() * 0.4); // Random width variation
  }
  
  // Calculate the range for the y-axis
  let yValues = wavePoints.map(point => point.y);
  let minY = Math.min(...yValues);
  let maxY = Math.max(...yValues);

  // Draw impulse and correction waves
  drawWaves(wavePoints);
  
  // Draw weekly candlesticks
  drawCandlesticks(wavePoints, numDays, numWeeks, fixedGap, totalWaveWidth);
  
  // Draw monthly axis with labels
  drawMonthlyAxis(numDays, fixedGap, totalWaveWidth);
  
  // Draw y-axis with labels
  drawYAxis(minY, maxY);
}

function drawWaves(points) {
  stroke(0);
  strokeWeight(2);
  
  for (let i = 0; i < points.length - 1; i++) {
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
}

function drawCandlesticks(points, numDays, numWeeks, fixedGap, totalWaveWidth) {
  strokeWeight(1);
  
  let weekWidth = totalWaveWidth / numWeeks; // Calculate width for each week
  
  for (let i = 0; i < numDays - 1; i += 7) {
    let startIndex = i;
    let endIndex = min(i + 7, points.length - 1);
    
    let open = points[startIndex].y + $fx.rand() * 40 - 20; // Random open price
    let close = points[endIndex].y + $fx.rand() * 40 - 20; // Random close price
    let high = Math.min(open, close) - $fx.rand() * 10 - 10; // Random high price
    let low = Math.max(open, close) + $fx.rand() * 10 + 10; // Random low price
    let colorFill = (close < open) ? color(255, 0, 0) : color(0, 255, 0); // Red for down, green for up
    
    let weekStartX = fixedGap + (i / numDays) * totalWaveWidth;
    let weekEndX = fixedGap + ((i + 7) / numDays) * totalWaveWidth;
    
    let candleWidth = e / 300; // Further reduced candle width
    let candleCenterX = (weekStartX + weekEndX) / 2; // Center of the candle
    
    // Draw the wick
    stroke(colorFill);
    line(candleCenterX, high, candleCenterX, low);
    
    // Draw the body with a smaller width
    let bodyColor = colorFill;
    let borderColor = colorFill; // Border color same as body color for visibility
    
    fill(bodyColor);
    stroke(borderColor);
    strokeWeight(1); // Thin border
    
    rectMode(CENTER); // Use CENTER mode to center the rectangle
    rect(candleCenterX, (open + close) / 2, candleWidth, abs(open - close)); // Draw body centered
  }
}

function drawMonthlyAxis(numDays, fixedGap, totalWaveWidth) {
  stroke(150); // Light gray for axis lines
  strokeWeight(1);
  
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let numMonths = monthNames.length; // 12 months

  let monthWidth = totalWaveWidth / numMonths; // Calculate width for each month
  
  for (let i = 0; i < numMonths; i++) {
    let monthX = fixedGap + (i / numMonths) * totalWaveWidth;
    
    // Draw the axis line
    line(monthX, 0, monthX, height);
    
    // Draw month labels
    textSize(10);
    textAlign(CENTER, TOP);
    fill(0);
    text(monthNames[i], monthX, height - 20);
  }
}

function drawYAxis(minY, maxY) {
  stroke(150); // Light gray for axis lines
  strokeWeight(1);
  
  let yAxisX = e / 10; // Position of the y-axis line
  let numTicks = 10; // Number of ticks on the y-axis
  let tickSpacing = height / numTicks; // Space between ticks

  // Draw y-axis line
  line(yAxisX, 0, yAxisX, height);
  
  // Draw y-axis ticks and labels
  for (let i = 0; i <= numTicks; i++) {
    let yPos = height - (i * tickSpacing); // Calculate y position for ticks
    let labelValue = map(i, 0, numTicks, minY, maxY); // Map tick position to y-axis value

    // Draw tick
    stroke(150);
    line(yAxisX - 5, yPos, yAxisX + 5, yPos);
    
    // Draw label
    textSize(10);
    textAlign(RIGHT, CENTER);
    fill(0);
    text(nf(labelValue, 1, 2), yAxisX - 10, yPos);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('ElliottWaves', 'png');
  }
}

$fx.preview();
