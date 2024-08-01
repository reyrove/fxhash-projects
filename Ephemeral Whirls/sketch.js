const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;

const features = {};
var loopers;
var backgroundColor;


function setup() {
createCanvas(e, e);

const backgroundColours =  ['#F5F5F5'         ,'#9AFEFF'      ,'#AAF0D1'   ,'#CCFB5D'  ,'#E3F9A6'      ,'#FED8B1'     ,'#FFFF33'    ,'#BCB88A','#FCDFFF'     ,'#FAAFBE'   ,'#F7CAC9'    ,'#FFCBA4'   ,'#FBD5AB'    ,'#FFF0DB'    ,'#D291BC'      ,'#FEA3AA'    ,'#FFB2D0'    ,'#EDC9AF'    ,'#FFF8DC'       ,'#CCFFFF'    ,'#87CEFA'           ,'#BDEDFF'];
const backgroundNames   =  ['WhiteSmoke (W3C)','Electric Blue','Magic Mint','Tea Green','Organic Brown','Light Orange','Neon Yellow','Sage'   ,'Cotton Candy','Donut Pink','Rose Quartz','Deep Peach','Coral Peach','Light Beige','Pastel Violet','Pastel Pink','Powder Pink','Desert Sand','Cornsilk (W3C)','Light Slate','LightSkyBlue (W3C)','Robin Egg Blue'];
const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length);
features.backgroundColour = backgroundColours[backgroundIndex];

const LooperColor =      [['#9F21DE','#60DE21'],
                         ['#F20DB2','#0DF24D'],
                         ['#1DAEE2','#E2511D','#4ABEE8','#EA7348'],
                         ['#C1200F','#0FC120','#200FC1'],
                         ['#EEA211','#11EEA2','#A211EE'],
                         ['#FAFB04','#04FAFB','#FB04FA'],
                         ['#A0D42B','#2BA0D4','#D42BA0'],
                         ['#46EC13','#1346EC','#EC1346'],
                         ['#E916C0','#E9A816','#16E93F','#1657E9'],
                         ['#F00F56','#C7F00F','#0FF0A9','#380FF0'],
                         ['#F00F1A','#8BF00F','#0FF0E5','#740FF0'],
                         ['#EB1914','#EB8414','#EB147B'],
                         ['#EFBB10','#B4EF10','#EF4B10'],
                         ['#C0A23F','#9DC03F','#C0623F'],
                         ['#A4EB14','#38EB14','#EBC714'],
                         ['#45BA4E','#45BA89','#76BA45'],
                         ['#29D6A4','#29B1D6','#29D64E'],
                         ['#1EBAE1','#1E59E1','#1EE1A6'],
                         ['#3A77C5','#423AC5','#3ABDC5'],
                         ['#1732E8','#6417E8','#179BE8'],
                         ['#673AC5','#AD3AC5','#3A52C5'],
                         ['#9216E9','#E916D6','#2916E9'],                              
                         ['#DC11EE','#EE1191','#6E11EE'],
                         ['#A855AA','#AA5582','#7D55AA'],
                         ['#F00FBE','#F00F4D','#F00F4D'],
                         ['#D42B85','#D42B31','#CE2BD4'],
                         ['#DD0D44','#DD3E0D','#DD0DAC'],
                         ['#A55A5C','#A57D5A','#A55A82'],
                         ['#B7489F','#9FB748','#489FB7'],
                         ['#78B649','#4978B6','#B64978'],
                         ['#0EF1BB','#BB0EF1','#F1BB0E'],
                         ['#93E01F','#1F93E0','#E01F93'],
                         ['#E7BE18','#18E756','#1841E7','#E718A9'],
                         ['#6A1DE2','#E21D33','#95E21D','#1DE2CC'],
                         ['#47D629','#299DD6','#B829D6','#D66229'],
                         ['#816A95','#9A88AA'],
                         ['#22DDB9','#4EE4C7'],
                         ['#292ED6','#D62984','#D6D129','#29D67B','#808080','#E98DBD','#D62935','#299ED6'],
                         ['#E21D93','#A4D1D1','#D4D629','#1A6386','#B84747','#D1A4A4','#29D6A4','#ABD9EF'],
                         ['#ADD7A9','#A9A4D1','#E1D466','#971D7E','#048184','#E58400','#F7D8F6','#04FDEB'],
                         ['#A47F5B','#5B80A4'],
                         ['#2AD86E','#BDD82A'],
                         ['#086D58','#0DA685','#0FBF9A','#11DBB0','#1FEEC2','#58F2D1','#92F7E1','#C5FBEF'],
                         ['#8D1E03','#C12904','#E53105','#FA4A1F','#FB7251','#FC9981','#FDC3B4','#FEDDD5']]; 

features.LooperColors = LooperColor[Math.floor($fx.rand() * LooperColor.length)];
features.NumberOfLoopers= Math.floor($fx.rand() * 2+23);
features.Time= Math.floor($fx.rand() * 2000+2000);

  loopers = [];
  for (let i = 0; i < features.NumberOfLoopers; i++) {
    loopers.push(new Looper(0, $fx.rand() * e));
  }

features.side=Math.floor($fx.rand() * 4);
const sides=['up','down','right','left'];

 noLoop();
  
 const readableFeaturesObj = {
  'Background Color': backgroundNames[backgroundIndex],
  'Number Of Iteration': features.Time,
  'Side': sides[features.side]
};

console.table(readableFeaturesObj);
$fx.features(readableFeaturesObj);
}

function draw(){

  if (features.side==0){
    rotate(Math.PI/2)
    translate(0,-e)}
  else if (features.side==1){
    rotate(-Math.PI/2)
    translate(-e,0)
  }
  else if (features.side==2){
    rotate(Math.PI)
    translate(-e,-e)
  }


background(features.backgroundColour); 
strokeWeight(e /($fx.rand() * 200+200)); 

for (let i = 0; i < features.Time; i++) {
  drawOnce();
}
}

function drawOnce() {
  for (const looper of loopers) {
    looper.step();
    looper.draw1();
  }
}

class Looper {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.heading = 0.1;
    this.speed = $fx.rand() * (e/1000); 
    this.sinOffset = $fx.rand() * 1000;
    this.loopingSpeed = $fx.rand() * (0.025, 0.1) * ($fx.rand() < 0.5 ? 1 : -1);
    this.c = color(features.LooperColors[Math.floor($fx.rand() * features.LooperColors.length)]);
    this.looping = false;
    this.maybeDoneLooping = false;
  }

  step() {
    if (this.looping) {
      this.heading += this.loopingSpeed + sin(this.sinOffset + 100 * 0.1) * 0.05;
      this.constrainHeading();

      if (!this.maybeDoneLooping) {
        if (abs(this.heading - PI) < 0.1) {
          this.maybeDoneLooping = true;
        }
      }

      if (this.maybeDoneLooping && (this.heading < TAU * 0.05 || this.heading > TAU * 0.95)) {
        this.looping = false;
        this.maybeDoneLooping = false;
        this.loopingSpeed = $fx.rand() * (0.025, 0.1) * ($fx.rand() < 0.5 ? 1 : -1);
      }
    } else {
      this.heading = ($fx.rand() - 0.5) * 0.2 + sin(this.sinOffset + 100 * 0.1) * 0.25; 
      this.constrainHeading();

      if (this.x > e * 0.25 && $fx.rand() < 0.01) {
        this.looping = true;
      }
    }

    this.prevX = this.x;
    this.prevY = this.y;
    this.x += cos(this.heading) * this.speed;
    this.y += sin(this.heading) * this.speed;

    if (this.x < 0 || this.x > e || this.y < 0 || this.y > e) {
      this.x = 0;
      this.y = $fx.rand() * e;
      this.prevX = this.x;
      this.prevY = this.y;
      this.heading = 0;
      this.c = color(features.LooperColors[Math.floor($fx.rand() * features.LooperColors.length)]);
    }
  }

  constrainHeading() {
    if (this.heading < 0) {
      this.heading += TAU;
    }
    this.heading = this.heading % TAU;
  }

  draw1() {
    stroke(this.c);
    line(this.prevX, this.prevY, this.x, this.y);
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('Ephemeral Whirls', 'png');
  }
}

$fx.preview();







