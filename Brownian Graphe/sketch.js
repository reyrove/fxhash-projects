const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;

let nextFrame = null;
const features = {};

var GraphMat = [];
var Points = [];
var diameter=[];



function setup() {
  createCanvas(e, e);

  const Backgroundcolors =     ['#000000','#34282C' ,'#3A3B3C'    ,'#52595D'  ,'#888B90'    ,'#B6B6B6','#C0C0C0','#98AFC7'  ,'#2F539B'     ,'#2916F5'    ,'#1F45FC'    ,'#1589FF'  ,'#14A3C7'  ,'#6495ED'       ,'#00BFFF'    ,'#9AFEFF'      ,'#16E2F5'         ,'#81D8D0'     ,'#01F9C6'    ,'#3EA99F'      ,'#045F5F'    ,'#033E3E'  ,'#2C3539' ,'#307D7E'      ,'#006A4E'     ,'#1AA260'     ,'#22CE83'          ,'#728C00'    ,'#808000','#08A04B'    ,'#228B22'    ,'#12AD2B'     ,'#52D017'  ,'#A0D6B4'        ,'#16F529'   ,'#00FF00','#E2F516'              ,'#E3F9A6'      ,'#F3E5AB','#FFEF00'      ,'#FFD700','#F6BE00'    ,'#FFA600'      ,'#CA762B'    ,'#C68E17','#966F33','#513B1C'       ,'#622F22'  ,'#43302E'     ,'#B83C08'   ,'#EB5406' ,'#FF6700'    ,'#FF8040'     ,'#FF8674'    ,'#FD1C03' ,'#E41B17' ,'#B21807'         ,'#931314'    ,'#550A35'    ,'#7D0541' ,'#F8B88B'      ,'#E75480v' ,'#F660AB'      ,'#F52887'      ,'#FA2A55' ,'#DC143C','#FF00FF'           ,'#DCD0FF'   ,'#C8A2C8','#FFF9E3'  ,'#FFFAF0'    ];
  const BackgroundcolorsName = ['Black'  ,'Charcoal','Stormy Gray','Iron Gray','Sheet Metal','Metal'  ,'Silver' ,'Blue Gray','Estoril Blue','Canary Blue','Blue Orchid','Neon Blue','Cyan Blue','CornflowerBlue','DeepSkyBlue','Electric Blue','Bright Turquoise','Tiffany Blue','Bright Teal','Seafoam Green','Medium Teal','Deep Teal','Gunmetal','Greenish Blue','Bottle Green','Chrome Green','Isle Of Man Green','Venom Green','Olive'  ,'Irish Green','ForestGreen','Parrot Green','Pea Green','Turquoise Green','Neon Green','Lime'   ,'Yellow Green Grosbeak','Organic Brown','Vanilla','Canary Yellow','Gold'   ,'Deep Yellow','Cheese Orange','Pumpkin Pie','Caramel','Wood'   ,'Milk Chocolate','Red Brown','Old Burgundy','Ginger Red','Red Gold','Neon Orange','Mango Orange','Salmon Pink','Neon Red','Love Red','Tomato Sauce Red','Saffron Red','Purple Lily','Plum Pie','Pastel Orange','Dark Pink','Dark Hot Pink','Hot Deep Pink','Red Pink','Crimson','Magenta or Fuchsia','Pale Lilac','Lilac'  ,'Egg Shell','FloralWhite'];

  const BackgroundIndex1 = Math.floor($fx.rand() * Backgroundcolors.length);
  const BackgroundIndex2 = Math.floor($fx.rand() * Backgroundcolors.length);

  features.backgroundColour1 = Backgroundcolors[BackgroundIndex1];
  features.backgroundColour2 = Backgroundcolors[BackgroundIndex2];

  features.numberOfstartPoint=Math.floor($fx.rand()*12+3);
  features.minimumNumlink=Math.floor($fx.rand()*(features.numberOfstartPoint-1));
  features.boundaryBuffer=e/($fx.rand()*20+10);


  GraphMat = generateSymmetricGraphMatrix(features.numberOfstartPoint, features.minimumNumlink);
  Points = generateRandomPoints(features.numberOfstartPoint, e, e,features.boundaryBuffer);

  diameter=e/($fx.rand()*80+20);
  features.balldiameter=diameter;

  frameRate(60);

  const readableFeaturesObj = {
    'Background Gradient Color 1': BackgroundcolorsName[BackgroundIndex1],
    'Background Gradient Color 2': BackgroundcolorsName[BackgroundIndex2],
    'Number of Points at begin'  : features.numberOfstartPoint,
    'Minimum number of link for each Point' : features.minimumNumlink,
  };

  console.table(readableFeaturesObj);
  $fx.features(readableFeaturesObj);


}

function draw() {
  diagonalGradientRect(0, 0, e, e, features.backgroundColour1, features.backgroundColour2);
  drawGraph(GraphMat, Points, e,features.balldiameter);
  Points = movePoints(Points, features.balldiameter, features.balldiameter/4, features.balldiameter/4, e, e,features.boundaryBuffer);
  
  $fx.preview();
}

function getRandomInRange(min, max) {
  return $fx.rand() * (max - min) + min;
}

function diagonalGradientRect(x, y, w, h, c1, c2) {
  let C1 = color(c1);
  let C2 = color(c2);
  beginShape();

  let maxDist = dist(0, 0, w, h);

  for (let i = 0; i <= w; i += e / 100) {
    for (let j = 0; j <= h; j += e / 100) {
      let distToStart = dist(i, j, 0, 0);
      let inter = maxDist !== 0 ? map(distToStart, 0, maxDist, 0, 1) : 0;
      let c = lerpColor(C1, C2, inter);
      stroke(c);
      fill(c);
      rect(x + i, y + j, e / 100, e / 100);
    }
  }
  endShape();
}

function generateSymmetricGraphMatrix(n, m) {
  function getRandomInt(max) {
    return Math.floor($fx.rand() * max);
  }

  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    let indices = new Set();

    while (indices.size < m) {
      const randomIndex = getRandomInt(n);
      if (randomIndex !== i) {
        indices.add(randomIndex);
        matrix[i][randomIndex] = 1;
        matrix[randomIndex][i] = 1;
      }
    }
  }

  return matrix;
}

function generateRandomPoints(numPoints, width, height,boundaryBuffer) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const x = $fx.rand() * (width -2*boundaryBuffer)+boundaryBuffer;
    const y = $fx.rand() * (height-2*boundaryBuffer)+boundaryBuffer;
    points.push({
      x,
      y,
      color: color(255), // Initialize color to white
      touched: false // Track whether the point has touched another
    });
  }

  // Initialize velocities for new points
  points.velocities = points.map(() => ({ vx: $fx.rand() * 2 - 1, vy: $fx.rand() * 2 - 1 }));

  return points;
}

function drawGraph(matrix, pts, canvasWidth,radius) {
  const maxDist = canvasWidth * sqrt(2);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        const point1 = pts[i];
        const point2 = pts[j];
        const d = dist(point1.x, point1.y, point2.x, point2.y);

        const col = lerpColor(color(255), color(0), d / maxDist);

        stroke(col);
        line(point1.x, point1.y, point2.x, point2.y);
      }
    }
  }

  pts.forEach(pt => {
    fill(pt.color);
    ellipse(pt.x, pt.y, radius, radius);
  });
}

function movePoints(points, radius, rangeX, rangeY, canvasWidth, canvasHeight,boundaryBuffer) {
  const minDistance = radius ;

  if (!points.velocities) {
    points.velocities = points.map(() => ({ vx: $fx.rand() * 2 - 1, vy: $fx.rand() * 2 - 1 }));
  }

  points.forEach((point, index) => {
    const velocity = points.velocities[index];

    const movementX = velocity.vx * rangeX;
    const movementY = velocity.vy * rangeY;

    point.x += movementX;
    point.y += movementY;

    if (point.x < boundaryBuffer || point.x > canvasWidth - boundaryBuffer) {
      velocity.vx = -velocity.vx;
      point.x = constrain(point.x, boundaryBuffer, canvasWidth - boundaryBuffer);
    }

    if (point.y < boundaryBuffer || point.y > canvasHeight - boundaryBuffer) {
      velocity.vy = -velocity.vy;
      point.y = constrain(point.y, boundaryBuffer, canvasHeight - boundaryBuffer);
    }

    velocity.vx += ($fx.rand() * 2 - 1) * 0.05;
    velocity.vy += ($fx.rand() * 2 - 1) * 0.05;

    const magnitude = Math.sqrt(velocity.vx ** 2 + velocity.vy ** 2);
    if (magnitude > 1) {
      velocity.vx /= magnitude;
      velocity.vy /= magnitude;
    }

    points.forEach((otherPoint, otherIndex) => {
      if (index === otherIndex) return;

      const dx = otherPoint.x - point.x;
      const dy = otherPoint.y - point.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance <= minDistance) {
        // Calculate simple linear momentum exchange
        const tempVx = velocity.vx;
        const tempVy = velocity.vy;

        velocity.vx = points.velocities[otherIndex].vx;
        velocity.vy = points.velocities[otherIndex].vy;

        points.velocities[otherIndex].vx = tempVx;
        points.velocities[otherIndex].vy = tempVy;

        // Alternate colors between black and white
        point.color = point.color.levels[0] === 0 ? color(255) : color(0);
        otherPoint.color = otherPoint.color.levels[0] === 0 ? color(255) : color(0);

        point.touched = true;
        otherPoint.touched = true;
      } else {
        if (!point.touched) point.color = color(255);
        if (!otherPoint.touched) otherPoint.color = color(255);
      }
    });

    point.touched = point.touched && points.some(otherPoint => dist(point.x, point.y, otherPoint.x, otherPoint.y) < minDistance);
  });

  return points;
}

function mousePressed() {
  // Add a new point at the mouse position
  const newPoint = { x: mouseX, y: mouseY, color: color(255), touched: false }; // Initialize color to white

  // Add the new point to the graph matrix
  const newIndex = Points.length;
  Points.push(newPoint);

  GraphMat.forEach(row => row.push(0)); // Add column for new point
  GraphMat.push(Array(Points.length).fill(0)); // Add row for new point

  // Connect the new point to a random subset of existing points
  const numConnections = Math.floor($fx.rand()*(Points.length-1-features.minimumNumlink)+features.minimumNumlink); // Random number of connections
  const existingPointsIndices = Array.from({ length: Points.length - 1 }, (_, i) => i);

  shuffle(existingPointsIndices); // Randomize the indices

  for (let i = 0; i < numConnections && i < existingPointsIndices.length; i++) {
    const index = existingPointsIndices[i];
    GraphMat[index][newIndex] = 1;
    GraphMat[newIndex][index] = 1;
  }

  // Initialize velocity for the new point only
  Points.velocities.push({ vx: $fx.rand() * 2 - 1, vy: $fx.rand() * 2 - 1 });
}

function touchStarted() {
  // Handle touch events similarly to mouse press
  mousePressed(); // Call the same function used for mouse press
  return false; // Prevent default behavior
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('Brownian Graphe', 10);
  }
}
