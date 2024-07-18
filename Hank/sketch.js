const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;

let nextFrame = null;
const features = {};

let deltaStartX;
let deltaStartY;
let deltaEndW;
let deltaEndH;

let r;
let g;
let b;

let x;
let y;
let w;
let h;
let theta;
let dth;
let rgbRange;
let minRangeW;
let maxRangeW;
let minRangeH;
let maxRangeH;

function setup() {
  createCanvas(e, e);

  const Backgroundcolors =     ['#34282C' ,'#3B3131','#0C090A','#36454F'      ,'#151B54'   ,'#045F5F'    ,'#045D5D'  ,'#033E3E'  ,'#25383C'      ,'#2C3539' ,'#1F6357'        ,'#555D50','#254117'          ,'#004225'    ,'#665D1E'       ,'#483C32','#4A412A'           ,'#473810'         ,'#493D26','#513B1C'       ,'#3D3635'   ,'#3B2F2F'    ,'#43302E'     ,'#622F22'  ,'#5C3317'     ,'#7E3517'  ,'#800000','#660000'  ,'#551606'    ,'#3F000F'        ,'#3D0C02'   ,'#2F0909'    ,'#2B1B17' ,'#550A35'    ,'#614051' ,'#583759'    ,'#4E5180'    ,'#483D8B'      ,'#4B0150'    ,'#36013F'    ,'#2E1A47'        ,'#736F6E'   ,'#888B90'    ,'#99A3A3'             ,'#B6B6B4'   ,'#C9C1C1'  ,'#D1D0CE'   ,'#DADBDD'     ,'#F5F5F5'   ,'#BCC6CC'        ,'#98AFC7'  ,'#728FCE'          ,'#2916F5'    ,'#1974D2'         ,'#1589FF'  ,'#14A3C7'  ,'#659EC7' ,'#87AFC7'      ,'#95B9C7'  ,'#3BB9FF'    ,'#79BAEC'   ,'#A0CFEC'   ,'#B4CFEC'    ,'#C2DFFF' ,'#AFDCEC'   ,'#C9DFEC'  ,'#EBF4FA','#F0FFFF','#CCFFFF'    ,'#9AFEFF'      ,'#57FEFF'    ,'#4EE2EC'     ,'#8EEBEC'    ,'#CFECEC'       ,'#B3D9D9'   ,'#81D8D0'     ,'#7BCCB5'   ,'#66CDAA'         ,'#93E9BE'           ,'#AAF0D1'   ,'#01F9C6'    ,'#40E0D0'  ,'#46C7C7'  ,'#20B2AA'      ,'#00A36C','#3EB489','#50C878','#7C9D8E'       ,'#78866B'         ,'#728C00'    ,'#6B8E23'  ,'#808000','#08A04B'    ,'#6AA121'    ,'#8A9A5B'   ,'#4AA02C'     ,'#12AD2B'     ,'#73A16C'       ,'#6CBB3C'    ,'#4CC417'    ,'#54C571'     ,'#89C35C'   ,'#99C68E'   ,'#A0D6B4'        ,'#8FBC8F'     ,'#829F82'    ,'#A2AD9C'   ,'#B8BC86'          ,'#9CB071'     ,'#8FB31D'     ,'#B0BF1A'   ,'#77DD77'     ,'#5EFB6E'   ,'#00FA9A'          ,'#12E193'   ,'#00FF00','#ADF802'    ,'#DAEE01'          ,'#CCFB5D'  ,'#90EE90'   ,'#E3F9A6'      ,'#DBF9DB'         ,'#E8F1D4'     ,'#F5FFFA'  ,'#FFFFC2'  ,'#FFFDD0'    ,'#F5F5DC','#FFF8DC' ,'#F7E7CE'  ,'#F5DEB3','#FED8B1'     ,'#FBD5AB'    ,'#FBE7A1'      ,'#E8E4C9'    ,'#F0E68C','#FFE87C'   ,'#FFFF33'    ,'#F5E216'      ,'#FFCE44'    ,'#FBB917','#FBB117','#FFA500','#EE9A4D'   ,'#E2A76F'    ,'#C19A6B'    ,'#E6BF83'   ,'#C2B280','#C8B560'        ,'#C7A317'     ,'#E1AD01','#CD853F','#CA762B'    ,'#B87333','#966F33','#806517'  ,'#8E7618','#8A865D'    ,'#93917C'        ,'#AF9B60'     ,'#A0522D','#B83C08'   ,'#EB5406' ,'#C36241','#E56717'      ,'#FF5F1F'      ,'#FF7F50','#FF8674'    ,'#F75D59' ,'#FD1C03' ,'#E41B17' ,'#7F525D'    ,'#FA2A55' ,'#DA70D6','#5865F2','#C8C4DF'];
  const BackgroundcolorsName = ['Charcoal','Oil'    ,'Night'  ,'Charcoal Blue','Night Blue','Medium Teal','Dark Teal','Deep Teal','DarkSlateGray','Gunmetal','Dark Green Blue','Ebony'  ,'Dark Forest Green','Lotus Green','Antique Bronze','Taupe'  ,'Dark Grayish Olive','Dark Hazel Brown','Mocha'  ,'Milk Chocolate','Gray Brown','Dark Coffee','Old Burgundy','Red Brown','Bakers Brown','Blood Red','Maroon' ,'Red Blood','Blood Night','Chocolate Brown','Black Bean','Dark Maroon','Midnight','Purple Lily','Eggplant','Plum Purple','Purple Navy','DarkSlateBlue','Dark Purple','Deep Purple','Midnight Purple','Alien Gray','Sheet Metal','Stainless Steel Gray','Gray Cloud','Steampunk','Gray Goose','Silver White','WhiteSmoke','Metallic Silver','Blue Gray','Light Purple Blue','Canary Blue','Bright Navy Blue','Neon Blue','Cyan Blue','Blue Koi','Columbia Blue','Baby Blue','Midday Blue','Denim Blue','Jeans Blue','Pastel Blue','Sea Blue','Coral Blue','Gulf Blue','Water'  ,'Azure'  ,'Light Slate','Electric Blue','Blue Zircon','Blue Diamond','Blue Lagoon','Pale Blue Lily','Light Teal','Tiffany Blue','Blue Green','MediumAquaMarine','Aqua Seafoam Green','Magic Mint','Bright Teal','Turquoise','Jellyfish','LightSeaGreen','Jade'   ,'Mint'   ,'Emerald','Metallic Green','Camouflage Green','Venom Green','OliveDrab','Olive'  ,'Irish Green','Green Onion','Moss Green','Green Pepper','Parrot Green','Dinosaur Green','Green Snake','Green Apple','Zombie Green','Green Peas','Frog Green','Turquoise Green','DarkSeaGreen','Basil Green','Gray Green','Light Olive Green','Iguana Green','Citron Green','Acid Green','Pastel Green','Jade Green','MediumSpringGreen','Aqua Green','Lime'   ,'Lemon Green','Neon Yellow Green','Tea Green','LightGreen','Organic Brown','Light Rose Green','Chrome White','MintCream','Parchment','Cream White','Beige'  ,'Cornsilk','Champagne','Wheat'  ,'Light Orange','Coral Peach','Golden Blonde','Dirty White','Khaki'  ,'Sun Yellow','Neon Yellow','Banana Yellow','Chrome Gold','Saffron','Beer'   ,'Orange' ,'Brown Sand','Brown Sugar','Camel Brown','Deer Brown','Sand'   ,'Fall Leaf Brown','Cookie Brown','Mustard','Peru'   ,'Pumpkin Pie','Copper' ,'Wood'   ,'Oak Brown','Hazel'  ,'Khaki Green','Millennium Jade','Bullet Shell','Sienna' ,'Ginger Red','Red Gold','Rust'   ,'Papaya Orange','Bright Orange','Coral'  ,'Salmon Pink','Bean Red','Neon Red','Love Red','Dull Purple','Red Pink','Orchid' ,'Blurple','Viola'  ];
  const BackgroundIndex1 = Math.floor($fx.rand() * Backgroundcolors.length);
  const BackgroundIndex2 = Math.floor($fx.rand() * Backgroundcolors.length);

  features.backgroundColour1 =  Backgroundcolors[BackgroundIndex1];
  features.backgroundColour2 =  Backgroundcolors[BackgroundIndex2];

  diagonalGradientRect(0, 0, e, e, features.backgroundColour1, features.backgroundColour2);

  const readableFeaturesObj = {
    'Background Gradient Color 1': BackgroundcolorsName[BackgroundIndex1],
    'Background Gradient Color 2': BackgroundcolorsName[BackgroundIndex2],
  };


  w = e/2;
  h = e/2;
  x = e/2;
  y = e/2;

  const range = e / 200;
  deltaStartX = getRandomInRange(-range, range);
  deltaStartY = getRandomInRange(-range, range);
  deltaEndW = getRandomInRange(-range , range );
  deltaEndH = getRandomInRange(-range , range );

  theta=getRandomInRange(0, Math.PI);
  dth=getRandomInRange(0, 0.05);
  rgbRange=getRandomInRange(5, 20);

  minRangeW=getRandomInRange(0, e/2);
  maxRangeW=getRandomInRange(minRangeW, e);
  minRangeH=getRandomInRange(0, e/2);
  maxRangeH=getRandomInRange(minRangeH, e);

  r = getRandomInRange(0,255);
  g = getRandomInRange(0,255);
  b = getRandomInRange(0,255);

  console.table(readableFeaturesObj);
  $fx.features(readableFeaturesObj);
 
  frameRate(50);
}

function draw() {
  
  beginShape();
  translate(x, y);
  rotate(theta); 

  strokeWeight(getRandomInRange(e/2000, e/1000));
  stroke(r, g, b);
  noFill();
  ellipse(0,0, w, h);
  endShape();

  r += getRandomInRange(-rgbRange, rgbRange);
  g += getRandomInRange(-rgbRange, rgbRange);
  b += getRandomInRange(-rgbRange, rgbRange);

  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);

  x += deltaStartX;
  y += deltaStartY;
  w += deltaEndW;
  h += deltaEndH;

  const diagonal = sqrt(sq(w / 2) + sq(h / 2));

  if (x - diagonal <= 0 || x + diagonal >= e) {
    deltaStartX *= -1;
    x = constrain(x, diagonal, e - diagonal);
  }

  if (y - diagonal <= 0 || y + diagonal >= e) {
    deltaStartY *= -1;
    y = constrain(y, diagonal, e - diagonal);
  }

  if (w < minRangeW || w > maxRangeW) {
    deltaEndW *= -1;
  }

  if (h < minRangeH || h > maxRangeH) {
    deltaEndH *= -1;
  }

  resetMatrix();
  theta+=$fx.rand() *dth;

  if(frameCount===500){
    $fx.preview();
  }

}

function getRandomInRange(min, max) {
  return $fx.rand() * (max - min) + min;
}

function diagonalGradientRect(x, y, w, h, c1, c2) {
  // Calculate the maximum distance from the starting point (0, 0) to the opposite corner (w, h)
  let C1=color(c1);
  let C2=color(c2);
beginShape();

  let maxDist = dist(0, 0, w, h);

  for (let i = 0; i <= w; i+= e/100 ) {
    for (let j = 0; j <= h; j+= e/100 ) {
      // Calculate the distance from the current point (i, j) to the starting point (0, 0)
      let distToStart = dist(i, j, 0, 0);
      // Ensure maxDist is not zero to avoid division by zero
      let inter = maxDist !== 0 ? map(distToStart, 0, maxDist, 0, 1) : 0;
      let c = lerpColor(C1, C2, inter);
      stroke(c);
      fill(c);
      rect(x + i, y + j, e/100, e/100); // Draw a pixel at (x + i, y + j)
    }
  }
endShape();
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('Hank', 10);
  }
}
