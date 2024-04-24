const ratio = 1 / 1
const prefix = 'Eyes'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 


const setup = () => {

  const BackgroundColours    =  ['#F5F5F5'     ,'#EEEEEE'   ,'#E5E4E2' ,'#C9DFEC'  ,'#F8F8FF'   ,'#F0FFFF','#CFECEC'       ,'#F5FFFA'  ,'#FBF6D9','#E8E4C9'    ,'#FFE6E8','#FFF9E3'  ,'#FEF0E3','#EAEEE9'  ,'#FAF0E6','#FFF5EE' ,'#F9F6EE'   ,'#FAF5EF','#FFFAF0'    ,'#FFFFF0','#FFFFF4'   ,'#FFFFF7'    ,'#FBFBF9','#FFFAFA','#FEFCFF'   ,'#FFFEFA'   ,'#FFFFFF'] 
  const BackgroundrNames =      ['WhiteSmoke'  ,'White Gray','Platinum','Gulf Blue','GhostWhite','Azure'  ,'Pale Blue Lily','MintCream','Blonde' ,'Dirty White','Blush'  ,'Egg Shell','OldLace','White Ice','Linen'  ,'SeaShell','Bone White','Rice'   ,'FloralWhite','Ivory'  ,'White Gold','Light White','Cotton' ,'Snow'   ,'Milk White','Half White','White'  ]

  const BackgroundIndex=Math.floor($fx.rand()*BackgroundColours.length);
  const BackgroundColor=BackgroundColours[BackgroundIndex];
  features.backgroundColour = BackgroundColor


  const setname= ['Blue Eye','Dull Blue Eye','ocean eyes','Baggy Eye','Deep Blue Eye','Bright Hazel Eye','Brown eye','Hazel Eye','Green Eye','Azure Eye','Steel Eye']

const set1=    ['#0a1172','#1338be','#0492c2','#63c5da','#82eefd']
const set2=    ['#91b5b5','#9ec4c2','#b5d7d5','#c9e9e7','#dff7f7']
const set3=    ['#526663','#708e8a','#9ac6c0','#a6d5cf','#b7e4dd']
const set4=    ['#927da3','#a08dab','#b3a3c0','#c9bfcc','#e0dee2']
const set5=    ['#2c4c63','#436580','#416156','#476269','#4a6c6e']
const set6=    ['#6e351f','#8e4326','#934e32','#9f5f46','#9f6954']
const set7=    ['#451800','#603101','#63390f','#542a0e','#5e481e']
const set8=    ['#161111','#5F4C2D','#6F6033','#88723F','#A19664']
const set9=    ['#004200','#035104','#017101','#03920c','#25a22b']
const set10=   ['#1F2266','#083CA8','#446FD4','#DBE9F4','#1F2266']
const set11=   ['#2E2B2E','#72747C','#8C9195','#AFB3BB','#2E2B2E']
const colorIndex=Math.floor($fx.rand()*setname.length);
{
if(colorIndex==0) {features.Color1=set1;}
else if(colorIndex==1) {features.Color1=set2;}
else if(colorIndex==2) {features.Color1=set3;}
else if(colorIndex==3) {features.Color1=set4;}
else if(colorIndex==4) {features.Color1=set5;}
else if(colorIndex==5) {features.Color1=set6;}
else if(colorIndex==6) {features.Color1=set7;}
else if(colorIndex==7) {features.Color1=set8;}
else if(colorIndex==8) {features.Color1=set9;}
else if(colorIndex==9) {features.Color1=set10;}
else if(colorIndex==10) {features.Color1=set11;}
}

  const readableFeaturesObj = {}
  readableFeaturesObj['Sclera Color']=BackgroundrNames[BackgroundIndex]
  readableFeaturesObj['Iris Color']=setname[colorIndex]


  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)

 
}

setup()

function drawSmoothClosedBezierCurve(ctx, points, LineWidth, Color) {
  if (points.length < 3) {
    console.error("At least three points are required to draw a closed curve.");
    return;
  }

  ctx.beginPath();
  ctx.moveTo((points[0][0] + points[points.length - 1][0]) / 2, (points[0][1] + points[points.length - 1][1]) / 2);

  for (let i = 0; i < points.length; i++) {
    let nextIndex = (i + 1) % points.length;
    let xc = (points[i][0] + points[nextIndex][0]) / 2;
    let yc = (points[i][1] + points[nextIndex][1]) / 2;
    ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
  }

 
  ctx.lineWidth = LineWidth;
  ctx.strokeStyle = Color;
  ctx.shadowBlur = LineWidth;
  ctx.shadowColor = Color;
  ctx.stroke();

  // Fill the curve
  ctx.fillStyle = Color;
  ctx.fill();
  ctx.closePath();
}

function anglesForEqualDivisions(ctx, numberOfDivisions) {
  if (numberOfDivisions <= 2) {
      console.error("Number of divisions should be greater than 2.");
      return;
  }

  // Calculate the angle for each division
  const angle = (2 * Math.PI) / numberOfDivisions;
  const angles = [];
  for (let i = 0; i < numberOfDivisions; i++) {
      angles.push(i * angle);
  }
  return angles;
}


function drawRandomShape(ctx, colorName, opacity, x, y, feather, width) {
  // Choose a random shape (0 for square window, 1 for circle)
  const shapeType = Math.round($fx.rand());
  const rectWidth = width / 2;
  const tolerance = width / 10; // Adjust tolerance based on desired gap

  // Set opacity
  ctx.globalAlpha = opacity;

  if (shapeType === 0) {
    // Draw square window with cross (four rectangles)
    ctx.fillStyle = colorName; // Use color name directly

    // Top left corner
    ctx.fillRect(x - rectWidth, y - rectWidth, rectWidth - tolerance / 2, rectWidth - tolerance / 2);

    // Bottom right corner
    ctx.fillRect(x + tolerance / 2, y - rectWidth, rectWidth - tolerance / 2, rectWidth - tolerance / 2);

    // Horizontal bar (adjusted with tolerance)
    ctx.fillRect(x - rectWidth, y + tolerance / 2, rectWidth - tolerance / 2, rectWidth - tolerance / 2);

    // Vertical bar (adjusted with tolerance)
    ctx.fillRect(x + tolerance / 2, y + tolerance / 2, rectWidth - tolerance / 2, rectWidth - tolerance / 2);
  } else {
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = colorName; // Use color name directly
    ctx.fill();
  }

  // Reset opacity
  ctx.globalAlpha = 1;

  // Set feather effect
  ctx.shadowBlur = feather;
}



const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  w= ctx.canvas.width;
  h= ctx.canvas.height;
  
  ctx.fillStyle=features.backgroundColour;
  ctx.fillRect(0,0,w,h);

  ctx.translate(w/2,h/2)

  A1=$fx.rand()*Math.PI;
  X1=w*Math.cos(A1)/2;
  Y1=w*Math.sin(A1)/2;
  X2=w*Math.cos(A1+Math.PI)/2;
  Y2=w*Math.sin(A1+Math.PI)/2;

  const gradient = ctx.createLinearGradient(X1, Y1, X2, Y2);
  gradient.addColorStop(0, features.Color1[0]);
  gradient.addColorStop(1, features.Color1[1]);
  ctx.arc(0,0,w/2,0,2*Math.PI)
  ctx.fillStyle=gradient;
  ctx.fill();

  numberOfDivisions1=$fx.rand()*100+200;
  const gradient1 = ctx.createLinearGradient(X1,Y1, X2, Y2);
  gradient1.addColorStop(0, features.Color1[1]);
  gradient1.addColorStop(1, features.Color1[2]);
  const Color1=gradient1;
  angle=anglesForEqualDivisions(ctx, numberOfDivisions1)
  const points1 = [];
  for (i=0; i<angle.length ;i++){
    Z1=$fx.rand()*1/2+1/2;
    points1[i]=[Z1*w/(2)*Math.cos(angle[i]),Z1*h/(2)*Math.sin(angle[i])];
  }
  LineWidth=w/(50+numberOfDivisions1)
  drawSmoothClosedBezierCurve(ctx, points1,LineWidth,Color1)

  numberOfDivisions2=$fx.rand()*2000+1000;
  const Color2=features.Color1[3];
  angle=anglesForEqualDivisions(ctx, numberOfDivisions2)
  const points2 = [];
  for (i=0; i<angle.length ;i++){
    Z2=$fx.rand()*3/4+1/4;
    points2[i]=[Z2*w/(2)*Math.cos(angle[i]),Z2*h/(2)*Math.sin(angle[i])];
  }
  LineWidth=w/(50+numberOfDivisions2)
  drawSmoothClosedBezierCurve(ctx, points2,LineWidth,Color2)


  numberOfDivisions3=$fx.rand()*2000+1000;
  const Color3=features.Color1[4];
  angle=anglesForEqualDivisions(ctx, numberOfDivisions3)
  const points3 = [];
  for (i=0; i<angle.length ;i++){
    Z3=$fx.rand()*4/5+1/5;
    points3[i]=[Z3*w/(2)*Math.cos(angle[i]),Z3*h/(2)*Math.sin(angle[i])];
  }
  LineWidth=w/(50+numberOfDivisions3)
  drawSmoothClosedBezierCurve(ctx, points3,LineWidth,Color3)



  ctx.beginPath()
  numberOfDivisions4=$fx.rand()*1500+1000;
  const Color4=features.Color4;
  angle=anglesForEqualDivisions(ctx, numberOfDivisions4)
  const points4 = [];
  for (i=0; i<angle.length ;i++){
    Z3=$fx.rand()*5/10+1/20;
    points4[i]=[Z3*w/(2)*Math.cos(angle[i]),Z3*h/(2)*Math.sin(angle[i])];
  }
  LineWidth=w/(50+numberOfDivisions3)
  drawSmoothClosedBezierCurve(ctx, points4,LineWidth,Color4)


  ctx.arc(0,0,w/10,0,2*Math.PI)
  ctx.fillStyle='black'
  ctx.fill();
  ctx.shadowBlur=w/10;
  ctx.shadowColor='black'
  ctx.closePath()

  ctx.beginPath()
  A=$fx.rand()*Math.PI/2-Math.PI/4;
  B=$fx.rand()*w/4+w/10;
  X=B*Math.cos(A);
  Y=B*Math.sin(A);
  W=$fx.rand()*w/10+w/10;
  Opacity=$fx.rand()*0.4+0.4;
  drawRandomShape(ctx, 'white', Opacity, X, Y, W, W)
  ctx.shadowBlur=W;
  ctx.shadowColor='white'
  ctx.closePath()


  if (!thumbnailTaken) {
    $fx.preview()
    thumbnailTaken = true
  }


  if ('forceDownload' in urlParams && forceDownloaded === false) {
    forceDownloaded = true
    await autoDownloadCanvas()

    window.parent.postMessage('forceDownloaded', '*')
  }


  if (animated) {
    nextFrame = window.requestAnimationFrame(drawCanvas)
  }
}


const init = async () => {

  window.addEventListener('resize', async () => {
   
    clearTimeout(resizeTmr)
    resizeTmr = setTimeout(async () => {
      await layoutCanvas()
    }, 100)
  })


  document.addEventListener('keypress', async (e) => {
    e = e || window.event
   
    if (e.key === 's' || 'S') autoDownloadCanvas()
  })

  await layoutCanvas()
}


const layoutCanvas = async (windowObj = window, urlParamsObj = urlParams) => {
 
  windowObj.cancelAnimationFrame(nextFrame)


  const { innerWidth: wWidth, innerHeight: wHeight, devicePixelRatio = 1 } = windowObj
  let dpr = devicePixelRatio
  let cWidth = wWidth
  let cHeight = cWidth / ratio

  if (cHeight > wHeight) {
    cHeight = wHeight
    cWidth = wHeight * ratio
  }

  const canvases = document.getElementsByTagName('canvas')
  Array.from(canvases).forEach(canvas => canvas.remove())

  let targetHeight = cHeight
  let targetWidth = targetHeight * ratio


  if ('forceWidth' in urlParams) {
    targetWidth = parseInt(urlParams.forceWidth)
    targetHeight = Math.floor(targetWidth / ratio)
    dpr = 1
  }

  targetWidth *= dpr
  targetHeight *= dpr

  const canvas = document.createElement('canvas')
  canvas.id = 'target'
  canvas.width = targetWidth
  canvas.height = targetHeight
  document.body.appendChild(canvas)

  canvas.style.position = 'absolute'
  canvas.style.width = `${cWidth}px`
  canvas.style.height = `${cHeight}px`
  canvas.style.left = `${(wWidth - cWidth) / 2}px`
  canvas.style.top = `${(wHeight - cHeight) / 2}px`

  drawCanvas()
}

const autoDownloadCanvas = async () => {
  const canvas = document.getElementById('target')

  const element = document.createElement('a')
  const filename = 'forceId' in urlParams
    ? `${prefix}_${urlParams.forceId.toString().padStart(4, '0')}_${$fx.hash}`
    : `${prefix}_${$fx.hash}`
  element.setAttribute('download', filename)


  element.style.display = 'none'
  document.body.appendChild(element)

  const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  element.setAttribute('href', window.URL.createObjectURL(imageBlob))

  element.click()

  document.body.removeChild(element)
}


document.addEventListener('DOMContentLoaded', init)
