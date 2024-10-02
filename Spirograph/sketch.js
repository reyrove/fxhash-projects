const e = Math.min(innerWidth, innerHeight);
const canvas = { w: e, h: e };
let nextFrame = null;
const features = {};
const isMob = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent);

let angle = 0;
let angleCoeff = [];
const angleVel = 3 / 1000;
const armLength = e / 10;
const NumberOflinks = 2;
var v1 = [];
var v2 = [];

let Path = [];
let Link = [];

const definitions = [
  {
    id: "number_id1",
    name: "first pendulum Frequency",
    type: "number",
    options: {       
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  },
  {
    id: "number_id2",
    name: "second pendulum Frequency",
    type: "number",
    options: {        
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  }
];

$fx.params(definitions);

function setup() {
  createCanvas(e, e);
  frameRate(60);

  const Backgroundcolors =     ['#34282C' ,'#3B3131','#0C090A','#36454F'      ,'#151B54'   ,'#045F5F'    ,'#045D5D'  ,'#033E3E'  ,'#25383C'      ,'#2C3539' ,'#1F6357'        ,'#555D50','#254117'          ,'#004225'    ,'#665D1E'       ,'#483C32','#4A412A'           ,'#473810'         ,'#493D26','#513B1C'       ,'#3D3635'   ,'#3B2F2F'    ,'#43302E'     ,'#622F22'  ,'#5C3317'     ,'#7E3517'  ,'#800000','#660000'  ,'#551606'    ,'#3F000F'        ,'#3D0C02'   ,'#2F0909'    ,'#2B1B17' ,'#550A35'    ,'#614051' ,'#583759'    ,'#4E5180'    ,'#483D8B'      ,'#4B0150'    ,'#36013F'    ,'#2E1A47'        ];
  const BackgroundcolorsName = ['Charcoal','Oil'    ,'Night'  ,'Charcoal Blue','Night Blue','Medium Teal','Dark Teal','Deep Teal','DarkSlateGray','Gunmetal','Dark Green Blue','Ebony'  ,'Dark Forest Green','Lotus Green','Antique Bronze','Taupe'  ,'Dark Grayish Olive','Dark Hazel Brown','Mocha'  ,'Milk Chocolate','Gray Brown','Dark Coffee','Old Burgundy','Red Brown','Bakers Brown','Blood Red','Maroon' ,'Red Blood','Blood Night','Chocolate Brown','Black Bean','Dark Maroon','Midnight','Purple Lily','Eggplant','Plum Purple','Purple Navy','DarkSlateBlue','Dark Purple','Deep Purple','Midnight Purple'];
  const BackgroundIndex1 = Math.floor($fx.rand() * Backgroundcolors.length);
  const BackgroundIndex2 = Math.floor($fx.rand() * Backgroundcolors.length);

  const Foregroundcolors =     ['#736F6E'   ,'#888B90'    ,'#99A3A3'             ,'#B6B6B4'   ,'#C9C1C1'  ,'#D1D0CE'   ,'#DADBDD'     ,'#F5F5F5'   ,'#BCC6CC'        ,'#98AFC7'  ,'#728FCE'          ,'#2916F5'    ,'#1974D2'         ,'#1589FF'  ,'#14A3C7'  ,'#659EC7' ,'#87AFC7'      ,'#95B9C7'  ,'#3BB9FF'    ,'#79BAEC'   ,'#A0CFEC'   ,'#B4CFEC'    ,'#C2DFFF' ,'#AFDCEC'   ,'#C9DFEC'  ,'#EBF4FA','#F0FFFF','#CCFFFF'    ,'#9AFEFF'      ,'#57FEFF'    ,'#4EE2EC'     ,'#8EEBEC'    ,'#CFECEC'       ,'#B3D9D9'   ,'#81D8D0'     ,'#7BCCB5'   ,'#66CDAA'         ,'#93E9BE'           ,'#AAF0D1'   ,'#01F9C6'    ,'#40E0D0'  ,'#46C7C7'  ,'#20B2AA'      ,'#00A36C','#3EB489','#50C878','#7C9D8E'       ,'#78866B'         ,'#728C00'    ,'#6B8E23'  ,'#808000','#08A04B'    ,'#6AA121'    ,'#8A9A5B'   ,'#4AA02C'     ,'#12AD2B'     ,'#73A16C'       ,'#6CBB3C'    ,'#4CC417'    ,'#54C571'     ,'#89C35C'   ,'#99C68E'   ,'#A0D6B4'        ,'#8FBC8F'     ,'#829F82'    ,'#A2AD9C'   ,'#B8BC86'          ,'#9CB071'     ,'#8FB31D'     ,'#B0BF1A'   ,'#77DD77'     ,'#5EFB6E'   ,'#00FA9A'          ,'#12E193'   ,'#00FF00','#ADF802'    ,'#DAEE01'          ,'#CCFB5D'  ,'#90EE90'   ,'#E3F9A6'      ,'#DBF9DB'         ,'#E8F1D4'     ,'#F5FFFA'  ,'#FFFFC2'  ,'#FFFDD0'    ,'#F5F5DC','#FFF8DC' ,'#F7E7CE'  ,'#F5DEB3','#FED8B1'     ,'#FBD5AB'    ,'#FBE7A1'      ,'#E8E4C9'    ,'#F0E68C','#FFE87C'   ,'#FFFF33'    ,'#F5E216'      ,'#FFCE44'    ,'#FBB917','#FBB117','#FFA500','#EE9A4D'   ,'#E2A76F'    ,'#C19A6B'    ,'#E6BF83'   ,'#C2B280','#C8B560'        ,'#C7A317'     ,'#E1AD01','#CD853F','#CA762B'    ,'#B87333','#966F33','#806517'  ,'#8E7618','#8A865D'    ,'#93917C'        ,'#AF9B60'     ,'#A0522D','#B83C08'   ,'#EB5406' ,'#C36241','#E56717'      ,'#FF5F1F'      ,'#FF7F50','#FF8674'    ,'#F75D59' ,'#FD1C03' ,'#E41B17' ,'#7F525D'    ,'#FA2A55' ,'#DA70D6','#5865F2','#C8C4DF'];
  const ForegroundcolorsName = ['Alien Gray','Sheet Metal','Stainless Steel Gray','Gray Cloud','Steampunk','Gray Goose','Silver White','WhiteSmoke','Metallic Silver','Blue Gray','Light Purple Blue','Canary Blue','Bright Navy Blue','Neon Blue','Cyan Blue','Blue Koi','Columbia Blue','Baby Blue','Midday Blue','Denim Blue','Jeans Blue','Pastel Blue','Sea Blue','Coral Blue','Gulf Blue','Water'  ,'Azure'  ,'Light Slate','Electric Blue','Blue Zircon','Blue Diamond','Blue Lagoon','Pale Blue Lily','Light Teal','Tiffany Blue','Blue Green','MediumAquaMarine','Aqua Seafoam Green','Magic Mint','Bright Teal','Turquoise','Jellyfish','LightSeaGreen','Jade'   ,'Mint'   ,'Emerald','Metallic Green','Camouflage Green','Venom Green','OliveDrab','Olive'  ,'Irish Green','Green Onion','Moss Green','Green Pepper','Parrot Green','Dinosaur Green','Green Snake','Green Apple','Zombie Green','Green Peas','Frog Green','Turquoise Green','DarkSeaGreen','Basil Green','Gray Green','Light Olive Green','Iguana Green','Citron Green','Acid Green','Pastel Green','Jade Green','MediumSpringGreen','Aqua Green','Lime'   ,'Lemon Green','Neon Yellow Green','Tea Green','LightGreen','Organic Brown','Light Rose Green','Chrome White','MintCream','Parchment','Cream White','Beige'  ,'Cornsilk','Champagne','Wheat'  ,'Light Orange','Coral Peach','Golden Blonde','Dirty White','Khaki'  ,'Sun Yellow','Neon Yellow','Banana Yellow','Chrome Gold','Saffron','Beer'   ,'Orange' ,'Brown Sand','Brown Sugar','Camel Brown','Deer Brown','Sand'   ,'Fall Leaf Brown','Cookie Brown','Mustard','Peru'   ,'Pumpkin Pie','Copper' ,'Wood'   ,'Oak Brown','Hazel'  ,'Khaki Green','Millennium Jade','Bullet Shell','Sienna' ,'Ginger Red','Red Gold','Rust'   ,'Papaya Orange','Bright Orange','Coral'  ,'Salmon Pink','Bean Red','Neon Red','Love Red','Dull Purple','Red Pink','Orchid' ,'Blurple','Viola'  ];
  const ForegroundIndex = Math.floor($fx.rand() * Foregroundcolors.length);


  features.backgroundColour1 =  Backgroundcolors[BackgroundIndex1];
  features.backgroundColour2 =  Backgroundcolors[BackgroundIndex2];
  features.foregroundColour  =  Foregroundcolors[ForegroundIndex];

  const NumberOfDevition = getRandomInt(NumberOflinks, 10 * NumberOflinks);
  const linklenght = multiplyVector(generateRandomSumVector(NumberOflinks, NumberOfDevition), e / ((NumberOfDevition + 1) * 2));

  v1=$fx.getParam('number_id1');
  v2=$fx.getParam('number_id2');
  if (v1==v2){v2+=0.1}
  angleCoeff = [v1,v2 ];
  features.LinkLenght = linklenght;

  for (let i = 0; i <= NumberOflinks - 1; i++) {
    Link.push({
      Lenght: linklenght[i],
      Speed: angleCoeff[i] * ($fx.rand() < 0.5 ? -1 : 1),
      initialRatio: $fx.rand() * 2 * Math.PI,
      x: [],
      y: []
    });
  }

  Path.push({ path: [] });

  const readableFeaturesObj = {
    'Background Gradient Color 1': BackgroundcolorsName[BackgroundIndex1],
    'Background Gradient Color 2': BackgroundcolorsName[BackgroundIndex2],
    'Line Color': ForegroundcolorsName[ForegroundIndex],
  };

  console.table(readableFeaturesObj);
  $fx.features(readableFeaturesObj);
  
  isMob ? pixelDensity(1) : pixelDensity(Math.min(window.devicePixelRatio, 2));
}


function diagonalGradientRect(x, y, w, h, c1, c2) {
  // Calculate the maximum distance from the starting point (0, 0) to the opposite corner (w, h)
  let C1=color(c1);
  let C2=color(c2);

  let maxDist = dist(0, 0, w, h);

  for (let i = 0; i <= w; i+= e/20 ) {
    for (let j = 0; j <= h; j+= e/20 ) {
      // Calculate the distance from the current point (i, j) to the starting point (0, 0)
      let distToStart = dist(i, j, 0, 0);
      // Ensure maxDist is not zero to avoid division by zero
      let inter = maxDist !== 0 ? map(distToStart, 0, maxDist, 0, 1) : 0;
      let c = lerpColor(C1, C2, inter);
      stroke(c);
      fill(c);
      rect(x + i, y + j, e/20, e/20); // Draw a pixel at (x + i, y + j)
    }
  }
}


function generateRandomVector(n, min, max) {
  let vector = [];
  for (let i = 0; i < n; i++) {
    vector.push(getRandomInt(min, max));
  }
  return vector;
}

function multiplyVector(vector, number) {
  return vector.map(element => element * number);
}

function getRandomInt(min, max) {
  return Math.floor($fx.rand() * (max - min + 1)) + min;
}

function generateRandomSumVector(m, n) {
  if (m <= 0 || n <= 0) {
    throw new Error('Both m and n must be positive integers.');
  }
  if (n < m) {
    throw new Error('n must be greater than or equal to m to ensure no zero values.');
  }

  let result = new Array(m).fill(1);
  n -= m;

  for (let i = 0; i < n; i++) {
    result[getRandomInt(0, m - 1)]++;
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor($fx.rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function drawShapeWithGradientStroke(color1hex, color2hex, path, weight) {
  const C1 = color(color1hex);
  const C2 = color(color2hex);

  noFill();
  strokeWeight(weight);

  for (let i = 0; i < path.length - 1; i++) {
    let inter = map(i, 0, path.length - 2, 0, 1);
    let gradientColor = lerpColor(C1, C2, inter);

    stroke(gradientColor);
    line(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
  }
}

function drawShapeWithSolidStroke(colorHex, path, weight) {
  const C = color(colorHex);

  noFill();
  strokeWeight(weight);
  stroke(C);

  for (let i = 0; i < path.length - 1; i++) {
    line(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
  }
}

function draw() {
  if (angle <= 3/1000) {
    diagonalGradientRect(0, 0, e, e, features.backgroundColour1, features.backgroundColour2);
    translate(e / 2, e / 2);
    for (let t = 0; t <= 10; t += 1 / 1000) {
      for (let i = 0; i <= NumberOflinks - 1; i++) {
        if (i === 0) {
          Link[i].x = Link[i].Lenght * sin(Link[i].Speed * 2 * Math.PI * t + Link[i].initialRatio);
          Link[i].y = Link[i].Lenght * cos(Link[i].Speed * 2 * Math.PI * t + Link[i].initialRatio);
        } else {
          Link[i].x = Link[i - 1].x + Link[i].Lenght * sin(Link[i].Speed * 2 * Math.PI * t + Link[i].initialRatio);
          Link[i].y = Link[i - 1].y + Link[i].Lenght * cos(Link[i].Speed * 2 * Math.PI * t + Link[i].initialRatio);
        }
      }
      Path[0].path.push({ x: Link[NumberOflinks - 1].x, y: Link[NumberOflinks - 1].y });
     
    }
    
    drawingContext.shadowColor='black'
    drawingContext.shadowBlur=e/50;
    drawShapeWithSolidStroke(features.foregroundColour, Path[0].path, e / 400);
     resetMatrix()
    $fx.preview();
  } else if (angle === 6 / 1000) {
    Path[0].path = [];
  } else {
    diagonalGradientRect(0, 0, e, e, features.backgroundColour1, features.backgroundColour2);
    translate(e / 2, e / 2);
    for (let i = 0; i <= NumberOflinks - 1; i++) {
      if (i === 0) {
        Link[i].x = Link[i].Lenght * sin(Link[i].Speed * 2 * Math.PI * angle + Link[i].initialRatio);
        Link[i].y = Link[i].Lenght * cos(Link[i].Speed * 2 * Math.PI * angle + Link[i].initialRatio);
      } else {
        Link[i].x = Link[i - 1].x + Link[i].Lenght * sin(Link[i].Speed * 2 * Math.PI * angle + Link[i].initialRatio);
        Link[i].y = Link[i - 1].y + Link[i].Lenght * cos(Link[i].Speed * 2 * Math.PI * angle + Link[i].initialRatio);
      }
    }
    Path[0].path.push({ x: Link[NumberOflinks - 1].x, y: Link[NumberOflinks - 1].y });
    drawingContext.shadowColor='black'
    drawingContext.shadowBlur=e/50;
    drawShapeWithGradientStroke(features.backgroundColour1, features.foregroundColour, Path[0].path, e / 400);


    beginShape()
    drawingContext.shadowColor=[];
    drawingContext.shadowBlur=0;
    stroke(0);
    strokeWeight(e/400)
    line(0, 0, Link[0].x, Link[0].y)
    line(Link[0].x, Link[0].y, Link[1].x, Link[1].y)
    endShape()

    beginShape()
    fill(100);
    strokeWeight(e/1000)
    ellipse(0, 0, e / 200, e / 200);
    ellipse(Link[0].x, Link[0].y, e / 200, e / 200);
    endShape()

    noStroke();
    fill(features.foregroundColour);
    ellipse(Link[1].x, Link[1].y, e / 300, e / 300);
    resetMatrix()
  }
  angle += angleVel;
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('Spirograph', 30);
  }
}