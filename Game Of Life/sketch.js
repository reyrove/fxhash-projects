const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;
const mm = e * .001;
let nextFrame = null 
const features = {} 
const isMob = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent);

let shapes = [];
let A=[];
let A1=[];

function setup() {

  createCanvas(e, e);
  frameRate(10);

  const backgroundColours =  ['#000000','#040720','#0C090A','#151B54','#033E3E','#25383C','#2C3539',
                              '#1F6357','#006A4E','#4B5320','#046307','#254117','#004225','#665D1E',
                              '#483C32','#473810','#513B1C','#3D3635','#3B2F2F','#622F22','#560319',
                              '#3F000F','#2F0909','#2B1B17','#36013F','#2E1A47','#583759','#551606'];
                                                                                                  
  const backgroundNames   =  ['Black (W3C)','Black Blue','Night','Night Blue','Deep Teal','DarkSlateGray','Gunmetal',
                              'Dark Green Blue','Bottle Green','Army Green','Deep Emerald Green','Dark Forest Green','Lotus Green','Antique Bronze',
                              'Taupe','Dark Hazel Brown','Milk Chocolate','Gray Brown','Dark Coffee','Red Brown','Dark Scarlet',
                              'Chocolate Brown','Dark Maroon','Midnight','Deep Purple','Midnight Purple','Plum Purple','Blood Night'];
                                                                                                                                                        
  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length);
  
  const foregroundColours = ['#F5F5F5','#728FCE','#14A3C7','#C6DEFF','#01F9C6','#22CE83','#52D017',
                             '#B0BF1A','#59E817','#E2F516','#EB5406','#FF6700','#F67280','#FF0080',
                             '#F433FF','#C45AEC','#FFF9E3','#CCCCFF','#D291BC','#FFB8BF','#E799A3',
                             '#F70D1A','#FF7722','#8B8000','#00FF00','#12E193','#7C9D8E','#16E2F5'];

  const foregroundNames =   ['WhiteSmoke (W3C)','Light Purple Blue','Cyan Blue','Heavenly Blue','Bright Teal','Isle Of Man Green','Pea Green',
                             'Acid Green','Nebula Green','Yellow Green Grosbeak','Red Gold','Neon Orange','Pastel Red','Red Magenta',
                             'Bright Neon Pink','Tyrian Purple','Egg Shell','Periwinkle','Pastel Violet','Soft Pink','Pink Daisy',
                             'Ferrari Red','Indian Saffron','Dark Yellow','Lime (W3C)','Aqua Green','Metallic Green','Bright Turquoise'];
                        
  const foregroundIndex = Math.floor($fx.rand() * foregroundColours.length)

  const NumOfdevisions = Math.floor($fx.rand()*200+100)

  features.backgroundColour = backgroundColours[backgroundIndex];
  features.foregroundColour = foregroundColours[foregroundIndex]; 
  features.Devitions=NumOfdevisions;

  A=generateRandomMatrix(features.Devitions, features.Devitions);
  A1=A;
  for(j=1;j<features.Devitions-1;j++){
    for(i=1;i<features.Devitions-1;i++){
    
     if(A[j][i]==1){
      fill(features.foregroundColour); square(i*e/features.Devitions, j*e/features.Devitions, e/features.Devitions);
    }
  }}

  const readableFeaturesObj = {};
  readableFeaturesObj['Background Color'] = backgroundNames[backgroundIndex];
  readableFeaturesObj['Square Color'] = foregroundNames[foregroundIndex];
  readableFeaturesObj['Size'] = features.Devitions*features.Devitions;

  $fx.features(readableFeaturesObj);
  console.table(readableFeaturesObj);

  (isMob) ? pixelDensity(1): pixelDensity(min(window.devicePixelRatio), 2);

}

function generateRandomMatrix(rows, cols) {
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {

      if(i==0 || j==0 || i==rows-1 || j==cols-1){
      row.push(0);
      }
      else{
      row.push($fx.rand() < 0.06 ? 1 : 0);
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function draw() {

background(features.backgroundColour);

for(j=1;j<features.Devitions-1;j++){
  for(i=1;i<features.Devitions-1;i++){
    let  a1=A[j-1][i-1];
    let  a2=A[j-1][i];
    let  a3=A[j-1][i+1];
    let  a4=A[j][i-1];
    let  a5=A[j][i+1];
    let  a6=A[j+1][i-1];
    let  a7=A[j+1][i];
    let  a8=A[j+1][i+1];
    let  b=A[j][i];

    let  neighbours=a1+a2+a3+a4+a5+a6+a7+a8;
    if(b==1){
      if(neighbours<2 || neighbours>3){
        A1[j][i]=0;
      }
    }else if(neighbours==3){
      A1[j][i]=1;
    }

  }}

A=A1;

for(j=1;j<features.Devitions-1;j++){
for(i=1;i<features.Devitions-1;i++){

 if(A[j][i]==1){
  fill(features.foregroundColour); 
  stroke(features.foregroundColour)
  square(i*e/features.Devitions, j*e/features.Devitions, e/features.Devitions);
}
}}

  resetMatrix()

  if (frameCount === 100) $fx.preview();

}

function keyPressed() {
  if (key === 's') {
    saveGif('Game Of Life',30);
  }
}