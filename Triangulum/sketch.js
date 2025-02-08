const e = Math.min(innerWidth, innerHeight);
const canvas = {
  w: e,
  h: e
};

let arcColors = [];
let starColors = [];
let planetColors = [];
let frostParticles = [];
let planets = [];
let magicalTriangles = [];

const gridRows = 5; 
const gridCols = 5;
const gridSpacingX = canvas.w / gridCols; 
const gridSpacingY = canvas.h / gridRows; 

function setup() {
  createCanvas(canvas.w, canvas.h);
  noFill();
  angleMode(DEGREES);

  for (let i = 0; i < 5; i++) {
    arcColors.push(color($fx.rand() * 155 + $fx.rand() * 100, $fx.rand() * 100 + $fx.rand() * 100, $fx.rand() * 105 + $fx.rand() * 150));
  }

  for (let i = 0; i < 5; i++) {
    starColors.push(color($fx.rand() * 55 + $fx.rand() * 200, $fx.rand() * 105 + $fx.rand() * 150, $fx.rand() * 55 + $fx.rand() * 200));
  }

  for (let i = 0; i < 5; i++) {
    planetColors.push(color($fx.rand() * 105 + $fx.rand() * 150, $fx.rand() * 155 + $fx.rand() * 100, $fx.rand() * 105 + $fx.rand() * 150, $fx.rand() * 150));
  }

  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      frostParticles.push({
        x: j * gridSpacingX + gridSpacingX / 2,
        y: i * gridSpacingY + gridSpacingY / 2,
        size: $fx.rand() * 3 * e / 400 + e / 200,
        alpha: $fx.rand() * 100 + 50
      });
    }
  }

  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      planets.push({
        x: j * gridSpacingX + gridSpacingX / 2,
        y: i * gridSpacingY + gridSpacingY / 2,
        size: $fx.rand() * e / 8 + e / 16,
        color: planetColors[(i + j) % planetColors.length]
      });
    }
  }

  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      magicalTriangles.push({
        x: j * gridSpacingX + gridSpacingX / 2,
        y: i * gridSpacingY + gridSpacingY / 2,
        size: $fx.rand() * e / 20 + e / 40,
        color: starColors[(i + j) % starColors.length]
      });
    }
  }

  $fx.preview();
}

function draw() {
  background($fx.rand() * 16, $fx.rand() * 24, $fx.rand() * 32, $fx.rand() * 30); 
  translate(canvas.w / 2, canvas.h / 2);

  drawPlanets();

  for (let i = 0; i < 17; i++) {
    let diameter = 16 * e / 100 + i * (canvas.w / 20); 
    let startAngle = (i * 72) % 360; 
    let endAngle = startAngle + 50;

    drawMagicalArcAsTriangle(diameter, startAngle, endAngle, i);
  }

  drawMagicalTriangles();

  drawFrostParticles();
}

function drawMagicalArcAsTriangle(diameter, startAngle, endAngle, gradientIndex) {
  for (let i = 0; i < 32; i++) {
    let inter = map(i, 0, 31, 0, 1);
    let c = lerpColor(arcColors[(gradientIndex * 2) % arcColors.length], 
                      arcColors[(gradientIndex * 2 + 1) % arcColors.length], 
                      inter);
    stroke(c);
    strokeWeight(8 + sin(i * 2) * 4); 

    let glowAlpha = map(i, 0, 31, 50, 200);
    strokeWeight(e / 25 - e * i / (25 * 32));
    stroke(c.levels[0], c.levels[1], c.levels[2], glowAlpha);

    let x1 = cos(startAngle + i) * diameter / 2;
    let y1 = sin(startAngle + i) * diameter / 2;
    let x2 = cos(endAngle + i) * diameter / 2;
    let y2 = sin(endAngle + i) * diameter / 2;
    let x3 = cos(startAngle + i + 45) * diameter / 2;
    let y3 = sin(startAngle + i + 45) * diameter / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function drawFrostParticles() {
  for (let particle of frostParticles) {
    fill(255, 255, 255, particle.alpha);
    noStroke();
    let x1 = particle.x - canvas.w / 2;
    let y1 = particle.y - canvas.h / 2 + particle.size / 2;
    let x2 = particle.x - canvas.w / 2 - particle.size / 2;
    let y2 = particle.y - canvas.h / 2 - particle.size / 2;
    let x3 = particle.x - canvas.w / 2 + particle.size / 2;
    let y3 = particle.y - canvas.h / 2 - particle.size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function drawPlanets() {
  for (let planet of planets) {
    let pulsatingSize = planet.size; 
    drawGlow(planet.x - canvas.w / 2, planet.y - canvas.h / 2, pulsatingSize, planet.color);
    
    let gradient = drawingContext.createRadialGradient(
      planet.x, planet.y, pulsatingSize * 0.1, 
      planet.x, planet.y, pulsatingSize
    );
    gradient.addColorStop(0, color(255, 255, 255, 200));
    gradient.addColorStop(1, planet.color);

    drawingContext.fillStyle = gradient;

    let x1 = planet.x - canvas.w / 2;
    let y1 = planet.y - canvas.h / 2 + pulsatingSize / 2;
    let x2 = planet.x - canvas.w / 2 - pulsatingSize / 2;
    let y2 = planet.y - canvas.h / 2 - pulsatingSize / 2;
    let x3 = planet.x - canvas.w / 2 + pulsatingSize / 2;
    let y3 = planet.y - canvas.h / 2 - pulsatingSize / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function drawGlow(x, y, size, planetColor) {
  noFill();
  for (let i = 10; i > 0; i--) {
    stroke(planetColor.levels[0], planetColor.levels[1], planetColor.levels[2], e / 20 * i);
    
    let triangleSize = size + i * e / 40;
    
    let x1 = x;
    let y1 = y - triangleSize / 2;
    let x2 = x - triangleSize / 2;
    let y2 = y + triangleSize / 2;
    let x3 = x + triangleSize / 2;
    let y3 = y + triangleSize / 2;

    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function drawMagicalTriangles() {
  for (let orb of magicalTriangles) {
    let gradient = drawingContext.createRadialGradient(
      orb.x, orb.y, orb.size * 0.1, 
      orb.x, orb.y, orb.size
    );
    gradient.addColorStop(0, color(255, 255, 255, 200));
    gradient.addColorStop(1, orb.color);

    drawingContext.fillStyle = gradient;

    let x1 = orb.x - canvas.w / 2;
    let y1 = orb.y - canvas.h / 2 + orb.size / 2;
    let x2 = orb.x - canvas.w / 2 - orb.size / 2;
    let y2 = orb.y - canvas.h / 2 - orb.size / 2;
    let x3 = orb.x - canvas.w / 2 + orb.size / 2;
    let y3 = orb.y - canvas.h / 2 - orb.size / 2;
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    save('CelestialTrianglePatternTile.png'); 
  }
}



