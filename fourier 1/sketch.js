const ratio = 1 / 1
const prefix = 'Fourier 1'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 




const setup = () => {



  const BackgroundColours1    =  ['#CD5C5C'  ,'#F08080'   ,'#FA8072','#E9967A'   ,'#DC143C','#FF0000','#B22222'  ,'#8B0000','#FF69B4','#FF1493' ,'#C71585'        ,'#DB7093'      ,'#FF6347','#FF4500'  ,'#FF8C00'   ,'#FFA500','#FFD700','#BDB76B'  ,'#00FF00','#32CD32'  ,'#2E8B57' ,'#006400'  ,'#556B2F'       ,'#6B8E23'  ,'#BC8F8F'  ,'#F4A460'   ,'#DAA520'  ,'#B8860B'      ,'#D2691E'  ,'#8B4513'    ,'#A0522D','#A52A2A','#800000','#696969','#708090'  ,'#2F4F4F'      ,'#000000']
  const BackgroundrNames1 =      ['IndianRed','LightCoral','Salmon' ,'DarkSalmon','Crimson','Red'    ,'FireBrick','DarkRed','HotPink','DeepPink','MediumVioletRed','PaleVioletRed','Tomato' ,'OrangeRed','DarkOrange','Orange' ,'Gold'   ,'DarkKhaki','Lime'   ,'LimeGreen','SeaGreen','DarkGreen','DarkOliveGreen','OliveDrab','RosyBrown','SandyBrown','Goldenrod','DarkGoldenrod','Chocolate','SaddleBrown','Sienna' ,'Brown'  ,'Maroon' ,'DimGray','SlateGray','DarkSlateGray','Black'  ]


  const BackgroundColours2    =  ['#FFFFE0	'   ,'#FFFACD	'    ,'#FFEFD5'   ,'#F0E68C','#E6E6FA	','#98FB98'  ,'#E0FFFF'  ,'#B0E0E6'   ,'#FFF8DC' ,'#FFEBCD'       ,'#F5DEB3','#FFFAFA','#F0FFF0' ,'#F5FFFA'  ,'#F0FFFF','#F0F8FF'  ,'#F8F8FF'   ,'#F5F5F5'   ,'#FFF5EE' ,'#F5F5DC','#FDF5E6','#FFFAF0'    ,'#FFFFF0','#FAEBD7'     ,'#FAF0E6','#FFF0F5'      ,'#FFE4E1'  ,'#DCDCDC'  ]
  const BackgroundNames2 =       ['LightYellow','LemonChiffon','PapayaWhip','Khaki'  ,'Lavender','PaleGreen','LightCyan','PowderBlue','Cornsilk','BlanchedAlmond','Wheat'  ,'Snow'   ,'HoneyDew','MintCream','Azure'  ,'AliceBlue','GhostWhite','WhiteSmoke','SeaShell','Beige'  ,'OldLace','FloralWhite','Ivory'  ,'AntiqueWhite','Linen'  ,'LavenderBlush','MistyRose','Gainsboro']
  
  const ForegroundColours1=['#ff4a03','#ff7803','#fff703','#7ef705','#07fa5c','#19faf6','#fc08bb','#ff0f57','#fa0511']
  const ForegroundColours2=['#610803','#5c2f08','#665a03','#364f01','#036125','#021061','#4d0357','#6b034e','#750219']

  features.backgroundColour = '#000000'
  features.Color1=BackgroundColours1 ;
  features.Color2=BackgroundColours2 ;
  features.Color3=ForegroundColours1;
  features.Color4=ForegroundColours2;
 

  const readableFeaturesObj = {}
 

 

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
 
}

setup()


function drawTreeCircle(ctx,startX, startY, length, angle, depth, branchWidth,color1,color2,radius) {

  var newLength, newAngle, newDepth, maxBranch = 5,
      endX, endY, maxAngle = 2 * Math.PI , subBranches;

  ctx.beginPath();

  endX = startX + length * Math.cos(angle);
  endY = startY + length * Math.sin(angle);
  ctx.lineWidth = branchWidth;

  Radius=$fx.rand()*radius;
  ctx.arc(endX, endY, Radius, 0, 2*Math.PI);
  
{
  if (depth <= 1) {
    ctx.fillStyle = color1;
  }
  if (depth > 1){
     ctx.fillStyle = color2;
  }
}
  ctx.fill();
  newDepth = depth - 1;

  if(!newDepth) {
    return;
  }

  subBranches = ($fx.rand() * (maxBranch - 1)) +1;
 

  for (var i = 0; i < subBranches; i++) {
    newAngle = angle - maxAngle+$fx.rand()*maxAngle*2;
    newLength = length *1.5;
    newradius = radius *1.02;
    drawTreeCircle(ctx,endX, endY, newLength, newAngle, newDepth, branchWidth,color1,color2,newradius);
  }
  ctx.closePath()

}

function drawTree(ctx,startX, startY, length, angle, depth, branchWidth,color1,color2) {

  var newLength, newAngle, newDepth, maxBranch = 6,
      endX, endY, maxAngle = 2 * Math.PI , subBranches;

  ctx.beginPath();
  ctx.moveTo(startX,startY)
  endX = startX + length * Math.cos(angle);
  endY = startY + length * Math.sin(angle);
  ctx.lineWidth = branchWidth;
  ctx.lineTo(endX, endY);
  
{
  if (depth <= 1) {
    ctx.strokeStyle = color1;
  }
  if (depth > 1){
     ctx.strokeStyle = color2;
  }
}
  ctx.stroke();
  newDepth = depth - 1;

  if(!newDepth) {
    return;
  }

  subBranches = ($fx.rand() * (maxBranch - 1)) +1;
 

  for (var i = 0; i < subBranches; i++) {
    newAngle = angle - maxAngle+$fx.rand()*maxAngle*2;
    newLength = length *1.5;
 
    drawTree(ctx,endX, endY, newLength, newAngle, newDepth, branchWidth,color1,color2);
  }
  ctx.closePath()

}

function randomgenerat(number,limits){
  let A=[]
  for (let i=0;i<number;i++){
    A[i]=Math.floor($fx.rand()*(limits[1]-limits[0])+limits[0]);
  }
  return A
}

function lcmOfVector(vec) {
  // Initialize LCM with the first element
  let lcm = vec[0];
  // Reduce remaining elements using lcm function
  for (let i = 1; i < vec.length; i++) {
    lcm = lcm * (vec[i] / gcd(lcm, vec[i]));  // Corrected line: Use GCD to calculate LCM efficiently
  }
  return lcm;
}

function gcd(a, b) {
  // Base case: GCD of a number and 0 is the number itself
  if (b === 0) return a;
  // Recursive call to find GCD
  return gcd(b, a % b);
}

function drawParametricCurve(ctx, centerX, centerY, radius, steps,color,Width,color2) {
  ctx.beginPath();
  R=radius;

  A1=randomgenerat(4,[1,7])
  A2=randomgenerat(4,[1,7])

  B1=randomgenerat(2,[4,8])
  B1[2]=(-2*B1[0]*B1[1])/(2*B1[0]+2*B1[1]-B1[0]*B1[1]);

  B2=randomgenerat(2,[4,8])
  B2[2]=(-2*B2[0]*B2[1])/(2*B2[0]+2*B2[1]-B2[0]*B2[1]);

  C1=randomgenerat(3,[0,2]);
  C2=randomgenerat(3,[0,2]);
  // Define the parametric equations for a circle
  const parametricX = (T) => centerX + R/B1[0] * Math.sin(T/A1[0])+ C1[0]*R/B1[1] * Math.sin(T/A1[1])+ C1[1]*R/B1[2] * Math.sin(T/A1[2])+ C1[2]*R/6 * Math.cos(T/A1[3]);
  const parametricY = (T) => centerY + R/B2[0] * Math.cos(T/A2[0])+ C2[0]*R/B2[1] * Math.cos(T/A2[1])+ C2[1]*R/B2[2] * Math.cos(T/A2[2])+ C2[2]*R/6 * Math.sin(T/A2[3]);
  
  // Increment angle from 0 to 2*PI with specified steps
  for (let theta = 0; theta <= 2* lcmOfVector(A1.concat(A2)) * Math.PI; theta += Math.PI / steps) {
    const x = parametricX(theta);
    const y = parametricY(theta);
    
    // Move to the first point or draw a line segment for subsequent points
    if (theta === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
    // Close the path to connect the last and first points
   
    ctx.strokeStyle = color;
    ctx.lineWidth = Width;
    ctx.shadowBlur=2*Width;
    ctx.shadowColor=color2;
    // Stroke (outline) the circle
    ctx.stroke();
}

const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)
  color11= features.Color2[Math.floor($fx.rand()*features.Color2.length)];
  color12= features.Color2[Math.floor($fx.rand()*features.Color2.length)];

  color21= features.Color1[Math.floor($fx.rand()*features.Color1.length)];
  color22= features.Color1[Math.floor($fx.rand()*features.Color1.length)];

  color3= features.Color3[Math.floor($fx.rand()*features.Color3.length)];
 // indexcolor = Math.floor($fx.rand() * features.lineColours.length);

 color4=features.Color4[Math.floor($fx.rand()*features.Color4.length)];

 ctx.save();


 // Create a circular clipping path
 ctx.beginPath();
  ctx.translate(w/2, h/2);
 ctx.arc(0, 0, w/3, 0, Math.PI * 2, true);
 ctx.clip();

 ctx.translate(-w/2, -h/2);
  X1=w/2;
  Y1=h/2;
  Angle1=-Math.PI/2; 
  drawTreeCircle(ctx, X1, Y1, w/100, Angle1, 8, w/250,color11,color21,w/500);
  ctx.restore();


  ctx.save();
  ctx.beginPath();
  ctx.translate(w/2, h/2);
  ctx.rect(-w/2, -h/2, w, h); // Outer rectangle
  ctx.arc(0, 0, w/3, 0, Math.PI * 2, true); // Hole anticlockwise
  ctx.closePath();
  ctx.clip();

  ctx.translate(-w/2, -h/2);
  X1=w/2;
  Y1=h/2;
  drawTree(ctx, X1, Y1, w/2, Angle1, 12, w/800,color12,color22);
  ctx.restore();

  drawParametricCurve(ctx, w/2, h/2, 3*w/4, 400,color3,w/150,color4)
 

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
