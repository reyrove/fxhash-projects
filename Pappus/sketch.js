const ratio = 1 / 1
const prefix = 'Pappus'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 




const setup = () => {

  const backgroundColours =  ['#FFF8DC'   ,'#F5DEB3' ,'	#F5F5DC' ,'#DCDCDC'     ,'#FFFAFA'    ,'#E0FFFF'   ,'#FFE4C4'  ,'#FFF0F5'       ,'#FFE4E1'    ,'#DDA0DD' ,'#F0F8FF'   , '#D5D6EA']
  const backgroundNames   =  ['Cornsilk'  ,'Wheat'   ,'Beige'    ,'Gainsboro'   ,'Snow'       ,'LightCyan' ,'Bisque'   ,'LavenderBlush' ,'MistyRose'  ,'Plum'    ,'AliceBlue' , 'Pastel Light Blue']
  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)

  const BodyColours    =  ['#A0522D	','#556B2F	'     ,'#4682B4	' ,'#8B4513'    ,'#800000','#D2691E'  , '#571B7E'    ,'#D291BC'        , '#F8B88B'      , '#8B8000'     , '#FFFF33'    , '#6AFB92'  ]
  const BodycolorNames =  ['Sienna'  ,'DarkOliveGreen','SteelBlue','SaddleBrown','Maroon' ,'Chocolate', 'Purple Iris', 'Pastel Violet' , 'Pastel Orange',  'Dark Yellow', 'Neon Yellow', 'Dragon Green'  ]
  const BodycolorIndex = Math.floor($fx.rand() * BodyColours.length)

  const hairColours    =  ['#00FA9A'          ,'#5F9EA0'   ,'#B0E0E6'    ,'#F4A460'   ,'#C0C0C0','#F0FFF0'  ,'#BC8F8F	'  ,'#16E2F5'         ,'#FDBD01'  ,'#C04000' , '#800517'  , '#E56E94']
  const haircolorNames =  ['MediumSpringGreen','CadetBlue' ,'PowderBlue' ,'SandyBrown','Silver' ,'HoneyDew' ,'RosyBrown	','Bright Turquoise','Neon Gold','Mahogany', 'Deep Red' , 'Blush Red']
  const haircolorIndex = Math.floor($fx.rand() * hairColours.length)


  features.backgroundColour = backgroundColours[backgroundIndex]
  features.bodyColour = BodyColours[BodycolorIndex]
  features.hairColour = hairColours[haircolorIndex]


  const readableFeaturesObj = {}
  readableFeaturesObj.Background = backgroundNames[backgroundIndex]
  readableFeaturesObj['Body Color'] = BodycolorNames [BodycolorIndex]
  readableFeaturesObj['Hair Color'] = haircolorNames[haircolorIndex]


  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
  
}

setup()


function drawTree(ctx,startX, startY, length, angle, depth, branchWidth,color1,color2) {

  var newLength, newAngle, newDepth, maxBranch = 12,
      endX, endY, maxAngle = 2 * Math.PI / 6, subBranches;

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
  branchWidth *= 0.618;

  for (var i = 0; i < subBranches; i++) {
    newAngle = angle - maxAngle+$fx.rand()*maxAngle*2;
    newLength = length *0.618;
    drawTree(ctx,endX, endY, newLength, newAngle, newDepth, branchWidth,color1,color2);
  }

}




const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)
  Color1= features.hairColour;
  Color2= features.bodyColour;
 // indexcolor = Math.floor($fx.rand() * features.lineColours.length);

  X1=w/4+$fx.rand()*w/2;
  Y1=6*h/10+$fx.rand()*h/3;
  Angle1=-11*Math.PI /20+$fx.rand()*2*Math.PI/20; 
  drawTree(ctx, X1, Y1, w/4, Angle1, 9, w/100,Color1,Color2);

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
