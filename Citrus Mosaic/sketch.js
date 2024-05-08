const ratio = 1 / 1
const prefix = 'Citrus Mosaic'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 




const setup = () => {
const readableFeaturesObj = {}
  
const ForegroundColours =  ['#F5F5F5'         ,'#98AFC7'   , '#728FCE'         , '#1E90FF'         ,'#95B9C7'  , '#3BB9FF'    , '#C2DFFF'  , '#F0FFFF'    , '#93E9BE'           , '#3B9C9C'  , '#2E8B57'        , '#50C878' , '#6AA121'     , '#8FB31D'     , '#59E817'      , '#E2F516'              , '#98FB98'        , '#E3F9A6'      , '#FFF8DC'       , '#F87217'       , '#F6358A'   , '#EE82EE'      ]
const ForegroundNames   =  ['WhiteSmoke (W3C)','Blue Gray' ,'Light Purple Blue', 'DodgerBlue (W3C)','Baby Blue', 'Midday Blue', 'Sea Blue' , 'Azure (W3C)', 'Aqua Seafoam Green', 'Deep Sea' , 'SeaGreen (W3C)' , 'Emerald' , 'Green Onion' , 'Citron Green', 'Nebula Green' , 'Yellow Green Grosbeak', 'PaleGreen (W3C)', 'Organic Brown', 'Cornsilk (W3C)', 'Pumpkin Orange', 'Violet Red', 'Violet (W3C)' ]
const ForegroundIndex = Math.floor($fx.rand() * ForegroundColours.length)
features.ForegroundColour = ForegroundColours[ForegroundIndex]
readableFeaturesObj['Foreground Color'] = ForegroundNames[ForegroundIndex]


const Squarecolors   =  ['#0AFFFF', '#01F9C6', '#008000', '#6AA121', '#6CC417', '#7FE817', '#16F529', '#B1FB17', '#E2F516' , '#FDBD01', '#FD1C03', '#FF6700', '#F535AA', '#FD349C', '#F433FF' , '#C71585' , '#E1AD01' , '#FFFF00', '#66FF00', '#00FF00', '#7FE817', '#16E2F5', '#0909FF', '#7D0552', '#DC143C', '#FF77FF', '#B041FF']


console.log(Squarecolors.length)

features.numofDivision=Math.floor($fx.rand()*13)+2;
features.numofSquares=features.numofDivision**2;

const Colors=[];
for (i=0;i<features.numofSquares;i++){
  Colors[i]=Squarecolors[Math.floor($fx.rand()*Squarecolors.length)];
}

features.SquareColor=Colors;

  readableFeaturesObj['Number of Squares']=features.numofSquares;
  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
  
}

setup()

function createRepeatingArcPattern(ctx,X,Y,W, H, fillColor,arcfill) {
  patternContext=ctx;
  patternContext.translate(X,Y)
  patternContext.fillStyle = fillColor;
  patternContext.fillRect(0, 0, W, H);

  A=Math.floor($fx.rand()*22)
{
if(A==0){
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.arc(0, 0, W , 0, 0.5 * Math.PI);
  patternContext.lineTo(0,0)

}
else if(A==1){  
  patternContext.beginPath()
  patternContext.moveTo(0, H)
  patternContext.arc(0, H , W , -0.5 * Math.PI,0);
  patternContext.lineTo(0, H)
}
else if(A==2){  
  patternContext.beginPath()
  patternContext.moveTo(W, 0)
  patternContext.arc(W, 0, W ,0.5 * Math.PI, Math.PI);
  patternContext.lineTo(W, 0)
}
else if(A==3){  
  patternContext.beginPath()
  patternContext.moveTo(W, H)
  patternContext.arc(W, H, W ,- Math.PI,-0.5 * Math.PI);
  patternContext.lineTo(W, H)
  
}
else if(A==4){  
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.lineTo(W, 0)
  patternContext.lineTo(0, H)
  patternContext.lineTo(0, 0)
}
else if(A==5){  
  patternContext.beginPath()
  patternContext.moveTo(0, H)
  patternContext.lineTo(0, 0)
  patternContext.lineTo(W, H)
  patternContext.lineTo(0, H)
}
else if(A==6){  
  patternContext.beginPath()
  patternContext.moveTo(W,0)
  patternContext.lineTo(0, 0)
  patternContext.lineTo(W, H)
  patternContext.lineTo(W,0)
}
else if(A==7){  
  patternContext.beginPath()
  patternContext.moveTo(W, H)
  patternContext.lineTo(W, 0)
  patternContext.lineTo(0, H)
  patternContext.lineTo(W, H)
}
else if(A==8){  
  patternContext.beginPath()
  patternContext.moveTo(0, 0)
  patternContext.arc(0, H/2 , W/2 , -0.5 * Math.PI,0.5 * Math.PI);
  patternContext.lineTo(0, 0)
}
else if(A==9){  
  patternContext.beginPath()
  patternContext.moveTo(0, 0)
  patternContext.arc(W/2, 0 , W/2 ,  0,Math.PI);
  patternContext.lineTo(0, 0)
}
else if(A==10){  
  patternContext.beginPath()
  patternContext.moveTo(0, H)
  patternContext.arc(W/2, H , W/2 , - Math.PI,0);
  patternContext.lineTo(0, H)
}
else if(A==11){  
  patternContext.beginPath()
  patternContext.moveTo(W, 0)
  patternContext.arc(W, H/2 , W/2 , 0.5 * Math.PI,3* Math.PI/2);
  patternContext.lineTo(W, 0)
}
else if(A==12){  
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.lineTo(W  , 0)
  patternContext.lineTo(W/2, H/2)
  patternContext.lineTo(0, 0)
}
else if(A==13){  
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.lineTo(0, H)
  patternContext.lineTo(W/2, H/2)
  patternContext.lineTo(0, 0)
}
else if(A==14){  
  patternContext.beginPath()
  patternContext.moveTo(W,0)
  patternContext.lineTo(W, H)
  patternContext.lineTo(W/2, H/2)
  patternContext.lineTo(W,0)
}
else if(A==15){  
  patternContext.beginPath()
  patternContext.moveTo(0, H)
  patternContext.lineTo(W, H)
  patternContext.lineTo(W/2, H/2)
  patternContext.lineTo(0, H)
}
else if(A==16){  
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.lineTo(W/2  , 0)
  patternContext.lineTo(W/2, H)
  patternContext.lineTo(0, H)
  patternContext.lineTo(0, 0)
}
else if(A==17){  
  patternContext.beginPath()
  patternContext.moveTo(W  , 0)
  patternContext.lineTo(W/2  , 0)
  patternContext.lineTo(W/2, H)
  patternContext.lineTo(W, H)
  patternContext.lineTo(W  , 0)
}
else if(A==18){  
  patternContext.beginPath()
  patternContext.moveTo(0,0)
  patternContext.lineTo(W  , 0)
  patternContext.lineTo(W, H/2)
  patternContext.lineTo(0, W/2)
  patternContext.lineTo(0, 0)
}
else if(A==19){  
  patternContext.beginPath()
  patternContext.moveTo(0, H)
  patternContext.lineTo(0, H/2)
  patternContext.lineTo(W, H/2)
  patternContext.lineTo(W, H)
  patternContext.lineTo(0, H)
}
else if(A==20){  
  patternContext.beginPath()
  patternContext.moveTo(0, 0)
  patternContext.lineTo(0, H)
  patternContext.lineTo(W, H)
  patternContext.lineTo(W, 0)
  patternContext.lineTo(0, 0)
}
  patternContext.shadowColor=arcfill;
  patternContext.shadowBlur=W/2
  patternContext.strokeStyle=arcfill;
  patternContext.stroke();
  patternContext.fillStyle = arcfill;
  patternContext.fill();
}
patternContext.translate(-X,-Y)
}

const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle ='black'
  ctx.fillRect(0, 0, w, h)
  

  
  Num=features.numofDivision
  const numCols = Num; // Calculate number of columns based on desired pattern width
  const numRows = Num; // Calculate number of rows based on desired pattern height
  j=-1;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      j++
      createRepeatingArcPattern(ctx,col * (w / Num),row * (h / Num),w/Num, h/Num, features.SquareColor[j],features.ForegroundColour)
    }
  }
  
  document.body.appendChild(canvas);
  
  document.body.appendChild(canvas);


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
