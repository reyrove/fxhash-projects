const ratio = 1 / 1
const prefix = 'Girih 1'

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
  const BackgroundIndex1 = Math.floor($fx.rand() * BackgroundColours1.length)

  const BackgroundColours2    =  ['#FFFFE0	'   ,'#FFFACD	'    ,'#FFEFD5'   ,'#F0E68C','#E6E6FA	','#98FB98'  ,'#E0FFFF'  ,'#B0E0E6'   ,'#FFF8DC' ,'#FFEBCD'       ,'#F5DEB3','#FFFAFA','#F0FFF0' ,'#F5FFFA'  ,'#F0FFFF','#F0F8FF'  ,'#F8F8FF'   ,'#F5F5F5'   ,'#FFF5EE' ,'#F5F5DC','#FDF5E6','#FFFAF0'    ,'#FFFFF0','#FAEBD7'     ,'#FAF0E6','#FFF0F5'      ,'#FFE4E1'  ,'#DCDCDC'  ]
  const BackgroundNames2 =       ['LightYellow','LemonChiffon','PapayaWhip','Khaki'  ,'Lavender','PaleGreen','LightCyan','PowderBlue','Cornsilk','BlanchedAlmond','Wheat'  ,'Snow'   ,'HoneyDew','MintCream','Azure'  ,'AliceBlue','GhostWhite','WhiteSmoke','SeaShell','Beige'  ,'OldLace','FloralWhite','Ivory'  ,'AntiqueWhite','Linen'  ,'LavenderBlush','MistyRose','Gainsboro']
  const BackgroundIndex2 = Math.floor($fx.rand() * BackgroundColours2.length)

  const foregroundColours    =['#663399'      ,'#8A2BE2'   ,'#6A5ACD'  ,'#483D8B'      ,'#5F9EA0'  ,'#B0C4DE'  ,'#00BFFF'    ,'#1E90FF'   ,'#0000FF	','#000080']
  const foregroundNames =     ['RebeccaPurple','BlueViolet','SlateBlue','DarkSlateBlue','CadetBlue','SteelBlue','DeepSkyBlue','DodgerBlue','Blue'    ,'Navy'   ]
  const foregroundIndex = Math.floor($fx.rand() * foregroundColours.length)

  const girih=['Umayyad mosque','Simple hexagram','Esreffoglu mosque'];
  const girihIndex=Math.floor($fx.rand() * girih.length)

  features.backgroundColour = '#000000'
  features.BackgroundColour1 = BackgroundColours1[BackgroundIndex1]
  features.BackgroundColour2 = BackgroundColours2[BackgroundIndex2]
  features.foregroundColour  = foregroundColours[foregroundIndex]
  features.girihtype=girihIndex;

  const readableFeaturesObj = {}
 
  readableFeaturesObj['Background Color 1'] = BackgroundrNames1 [BackgroundIndex1]
  readableFeaturesObj['Background Color 2'] = BackgroundNames2[BackgroundIndex2]
  readableFeaturesObj['Foreground Color'] = foregroundNames[foregroundIndex]
  readableFeaturesObj['Girih Name'] = girih[girihIndex]

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
 
}

setup()

function motif1(ctx, a, b,color,linewidth,shadowblur) { // Assuming 'a' and 'b' are defined elsewhere
  let angle = Math.PI/6;

  ctx.beginPath(); // Start a new path

  for (let i = 0; i < 12; i++) {
    let sx, sy;

    // Alternate between radii based on even/odd indices
    if (i % 2 === 0) {
      sx = Math.cos(i * angle) * b;
      sy = Math.sin(i * angle) * b;
    } else {
      sx = Math.cos(i * angle) * a;
      sy = Math.sin(i * angle) * a;
    }

    ctx.lineTo(sx, sy); // Create lines to form the shape
  }

  ctx.closePath(); // Close the path (important for filling)
  
  // You can choose either fill or stroke here:
  // ctx.fillStyle = 'red'; // Set fill color (uncomment for filling)
  // ctx.fill();
  ctx.shadowBlur=shadowblur;
  ctx.shadowColor=color;
  ctx.strokeStyle = color; // Set stroke color
  ctx.lineWidth=linewidth;
  ctx.stroke(); // Draw the outline

}


function motif2(ctx, a, b,color,linewidth,shadowblur) {
  let x, y;

  ctx.beginPath(); // Start a new path

  for (let i = 0; i < 12; i++) {
    if (i % 2 === 0) {
      x = a * Math.cos(Math.PI * i / 6); // Use radians for 30-degree angle
      y = a * Math.sin(Math.PI * i / 6);
    } else {
      x = b * Math.cos(Math.PI * i / 6);
      y = b * Math.sin(Math.PI * i / 6);
    }
    ctx.lineTo(x, y); // Create lines to form the shape
  }

  ctx.closePath(); // Close the path (important for filling)

  // You can choose either fill or stroke here:
  // ctx.fillStyle = 'red'; // Set fill color (uncomment for filling)
  // ctx.fill();
  ctx.shadowBlur=shadowblur;
  ctx.shadowColor=color;
  ctx.strokeStyle = color; // Set stroke color
  ctx.lineWidth=linewidth;
  ctx.stroke(); // Draw the outline

}

function motif3(ctx, a,color,linewidth,shadowblur) { // Assuming 'ctx' is defined elsewhere
  let x0, y0, x1, y1, x2, y2, x3, y3;

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate(i * Math.PI / 3); // Rotate by 60 degrees
    ctx.translate(a*Math.cos(Math.PI/6)*2,0)
    // Calculate points for lines (one calculation for each point)
    x0 = a * Math.cos(Math.PI / 6); // Point for line 1 (top right)
    y0 = a * Math.sin(Math.PI / 6);
    x1 = -x0; // Point for line 1 (top left)
    y1 = -y0;
    x2 = x0; // Point for line 2 (bottom left, reuse top right)
    y2 = y1; // Point for line 2 (bottom left, reuse top left)
    x3 = x1; // Point for line 2 (bottom right, reuse top left)
    y3 = y0; // Point for line 2 (bottom right, reuse top right)

    // Draw line 1
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.shadowBlur=shadowblur;
    ctx.shadowColor=color;
    ctx.strokeStyle = color; // Set stroke color
    ctx.lineWidth=linewidth;
    ctx.stroke(); // Or ctx.fill() if you want to fill

    // Draw line 2
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke(); // Or ctx.fill() if you want to fill
    ctx.shadowBlur=shadowblur;
    ctx.shadowColor=color;
    ctx.strokeStyle = color; // Set stroke color
    ctx.lineWidth=linewidth;

    ctx.restore();
 
  }
}


function star1(ctx,a,height,width,color,linewidth,shadowblur){
  b = a * (Math.sin(Math.PI * 3 / 4) / Math.sin(Math.PI / 12)); // Calculate outer radius
  dx = 2 * b;
  dy = 2 * b * Math.cos(Math.PI/6); // Approximate nRow and nCol values
  nRow = Math.ceil(height / dy)+1;
  nCol = Math.ceil(width / dx)+1;
for (let r = 0; r < nRow; r++) {
  for (let c = 0; c < nCol; c++) {
    ctx.save(); // Push the current transformation state

    if (r % 2 === 0) {
      // Rows 0, 2, 4, 6
      ctx.translate(c * dx, r * dy);
    } else {
      // Rows 1, 3, 5, 7
      ctx.translate(c * dx + b, r * dy);
    }

    motif1(ctx, a, b,color,linewidth,shadowblur)


    ctx.restore(); // Restore the previous transformation state
  }
}
}

function star2(ctx,a,height,width,color,linewidth,shadowblur) {
  b = a * 2 * Math.cos(Math.PI / 6);
  dx = 3 * a;
  dy = 4 * a * Math.cos(Math.PI / 6); // Approximate dy using radians
  nRow = Math.ceil(height / dy)+1;
  nCol = Math.ceil(width / dx)+1;

  for (let c = 0; c < nCol; c++) {
    for (let r = 0; r < nRow; r++) {
      ctx.save(); // Push current transformation state (optional)
      ctx.translate(dx * c, dy * r);
      if (c % 2 === 0) {
        ctx.translate(0, dy * 0.5); // Even columns shifted down slightly
      }

      motif2(ctx, a, b,color,linewidth,shadowblur)

      ctx.restore(); // Restore previous transformation state (optional)
    }
  }
}

function star3(ctx,a,height,width,color,linewidth,shadowblur) {
  

  dx = 6 * a * Math.cos(Math.PI / 6); // Calculate dx using radians
  dy = 4.5 * a;
  doff = 0.5 * dx; // Calculate offset for even rows
  nCol = Math.ceil(width / dx)+1;
  nRow = Math.ceil(height / dy)+1;

  for (let c = 0; c < nCol; c++) {
    for (let r = 0; r < nRow; r++) {
      ctx.save(); // Push current transformation state (optional)
      if (r % 2 === 0) {
        // Even rows shifted left by half offset
        ctx.translate(doff, 0);
      }
      ctx.translate(c * dx, r * dy); // Translate to position
      motif3(ctx, a,color,linewidth,shadowblur)
      ctx.restore(); // Restore previous transformation state (optional)
    }
  }
}

function drawTree(ctx,startX, startY, length, angle, depth, branchWidth,color1,color2) {

  var newLength, newAngle, newDepth, maxBranch = 5,
      endX, endY, maxAngle = 2 * Math.PI , subBranches;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  endX = startX + length * Math.cos(angle);
  endY = startY + length * Math.sin(angle);
  ctx.lineWidth = branchWidth;
  ctx.lineTo(endX, endY);
  ctx.lineCap = "round";
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
  branchWidth *= 1.1;

  for (var i = 0; i < subBranches; i++) {
    newAngle = angle - maxAngle+$fx.rand()*maxAngle*2;
    newLength = length *1.5;
    drawTree(ctx,endX, endY, newLength, newAngle, newDepth, branchWidth,color1,color2);
  }
  ctx.closePath()

}




const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)
  Color1= features.BackgroundColour2;
  Color2= features.BackgroundColour1;
  color3= features.foregroundColour;
 // indexcolor = Math.floor($fx.rand() * features.lineColours.length);

  X1=w/2;
  Y1=h/2;
  Angle1=-Math.PI/4; 
  drawTree(ctx, X1, Y1, w/3, Angle1, 12, w/2500,Color1,Color2);
 
Q=features.girihtype;

a=$fx.rand()*w/10+w/20
T=$fx.rand()*w/100+w/100;

if (Q==0){
  star1(ctx,a,h,w,color3,T,w/100)
}
else if (Q==1) {
  star2(ctx,a,h,w,color3,T,w/100)  
}
else if (Q==2) {
  star3(ctx,a,h,w,color3,T,w/100)  
}

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
