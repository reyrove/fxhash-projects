const ratio = 1 / 1
const prefix = 'Crazy letter'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 


const setup = () => {

  const backgroundColours =  ['#FFC0CB','#FFA07A'     ,'#FFFFE0'       ,'#E6E6FA'    ,'#ADFF2F'        ,'#66CDAA'          ,'#E0FFFF'   ,'#FFE4C4','#F5F5DC','#DCDCDC'  ,'#FFF0F5'       ,'#FFF8DC']
  const backgroundNames   =  ['Pink'   ,'LightSalmon' ,'LightYellow'   ,'Lavender'   ,'GreenYellow'    ,'MediumAquamarine' ,'LightCyan' ,'Bisque' ,'Beige'  ,'Gainsboro','LavenderBlush' ,'Cornsilk']

  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)

  const foregroundColours = ['#f5a04e', '#931a1e', '#fad2db', '#f2e73d', '#14b9dc', '#d65a9c', '#f2f8ef', '#395370']
  const foregroundNames =   []
  const foregroundIndex = Math.floor($fx.rand() * foregroundColours.length)

  features.backgroundColour = backgroundColours[backgroundIndex]
  features.lineColours = foregroundColours[foregroundIndex ]

  const readableFeaturesObj = {}
  readableFeaturesObj['Background Color'] = backgroundNames[backgroundIndex]
  readableFeaturesObj['Lines Color'] = foregroundNames[foregroundIndex]

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
  
}

setup()

function drawLine(ctx, lineY,margin) {
  const canvas = document.getElementById('target')
  const w = canvas.width
  const range = map(lineY, margin * 2, w - margin * 2, 0, w/($fx.rand()*20+30));
  let prevX = margin * ($fx.rand()*10+2);
  let prevY = lineY;
  const lineSpacing = w/($fx.rand()*100+20);

  for (let x = prevX + lineSpacing*$fx.rand()*10; x <= w - margin *$fx.rand()* 10; x += lineSpacing) {
    const y = lineY +$fx.rand()*2*range-range ;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();

    prevX = x;
    prevY = y;
  }
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function random(min, max) {
  return $fx.rand() * (max - min) + min;
}

const drawCanvas = async () => {
  window.cancelAnimationFrame(nextFrame)
  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height


  const margin = w/($fx.rand()*20+50);
  
  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = features.lineColours;
  ctx.lineWidth = w/($fx.rand()*300+200);
  ctx.shadowColor=features.lineColours;
  ctx.shadowBlur=w/($fx.rand()*300+200);


  ctx.beginPath();
  ctx.rect(margin, margin, w - margin * 2, h - margin * 2);
  ctx.stroke();
  
  for (let y = margin * 2; y < h - margin * 2; y += w/($fx.rand()*50+50)) {
    drawLine(ctx, y,margin);
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