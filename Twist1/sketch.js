const ratio = 1 / 1
const prefix = 'Twist 1'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 

$fx.params([
  {
    id: "number_id",
    name: "number of Circles",
    type: "number",
    options: {
      min: 100,
      max: 500,
      step: 10,
    },
  },

  {
    id: "number_id2",
    name: "Twist",
    type: "number",
    options: {
      min: Math.PI,
      max: 5*Math.PI,
      step: Math.PI/10,
    },
  }
])


const setup = () => {

  const backgroundColours =  ['#FFC0CB','#FFA07A'     ,'#FFFFE0'       ,'#E6E6FA'    ,'#ADFF2F'        ,'#66CDAA'          ,'#E0FFFF'   ,'#FFE4C4','#F5F5DC','#DCDCDC'  ,'#FFF0F5'       ,'#FFF8DC']
  const backgroundNames   =  ['Pink'   ,'LightSalmon' ,'LightYellow'   ,'Lavender'   ,'GreenYellow'    ,'MediumAquamarine' ,'LightCyan' ,'Bisque' ,'Beige'  ,'Gainsboro','LavenderBlush' ,'Cornsilk']

  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)

  const foregroundColours = ['#f5a04e', '#931a1e', '#fad2db', '#f2e73d', '#14b9dc', '#d65a9c', '#f2f8ef', '#395370']

  features.backgroundColour = backgroundColours[backgroundIndex]
  features.lineColours = foregroundColours

  const readableFeaturesObj = {}
  readableFeaturesObj.Background = backgroundNames[backgroundIndex]

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
}

setup()


function drawCircle(ctx, x, y, radius, color,linewidth,sblur) {
  ctx.lineCap = 'ROUND'
  ctx.lineWidth =linewidth 
  ctx.beginPath(); 
  ctx.shadowBlur = sblur
  ctx.shadowColor = color;
  ctx.arc(x, y, radius, 0,Math.PI * 2); 
  ctx.strokeStyle = color; 
  ctx.stroke();

}

const randomRgbColor = () => {
  let r = Math.floor($fx.rand() * (119,192)); 
  let g = Math.floor($fx.rand() * (158,252)); 
  let b = Math.floor($fx.rand() * (129,208)); 
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)

  circlenum=$fx.getParam("number_id");
  B=$fx.getParam("number_id2");

   for (let i=0;i<circlenum;i++) {
    A=$fx.rand()*(Math.PI/2,B)  
    cirColor=randomRgbColor() ;
    indexcolor = Math.floor($fx.rand() * features.lineColours.length);
    drawCircle(ctx, w/2+w*(Math.sin(A))/3, h/2+h*(Math.cos(A))/3, A*w/(6*B),cirColor,$fx.rand()*(w/(30*B),w/(20*B)),B)
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
