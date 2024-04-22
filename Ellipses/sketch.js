const ratio = 1 / 1
const prefix = 'Ellipses'

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
    name: "number of Big Ellipces",
    type: "number",
    options: {
      min: 2,
      max: 30,
      step: 1,
    },
  },
  {
    id: "number_id 1",
    name: "number of Small Ellipces",
    type: "number",
    options: {
      min: 2,
      max: 20,
      step: 1,
    },
  }
])


const setup = () => {
  const backgroundColours =  ['#FFC0CB','#FFA07A'     ,'#FFFFE0'       ,'#E6E6FA'    ,'#ADFF2F'        ,'#66CDAA'          ,'#E0FFFF'   ,'#FFE4C4','#F5F5DC','#DCDCDC'  ,'#FFF0F5'       ,'#FFF8DC']
  const backgroundNames=['Pink'   ,'LightSalmon' ,'LightYellow'   ,'Lavender'   ,'GreenYellow'    ,'MediumAquamarine' ,'LightCyan' ,'Bisque' ,'Beige'  ,'Gainsboro','LavenderBlush' ,'Cornsilk']
  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)

  const Colours2 =  ['#FFFF00'   ,'#FF00FF'    ,'#7FFF00'         ,'#00FFFF'      ,'#0000FF'        ,'#FFD700' ,'#9ACD32'       ,'#663399'       ,'#00FA9A'            ,'#FF4500'       ,'#FF1493'          ,'#00CED1']
  const color2Names   =  ['Yellow'    ,'Magenta'    ,'Chartreuse'      ,'Cyan'         ,'Blue'           ,'Gold'    ,'YellowGreen'   ,'RebeccaPurple' ,'MediumSpringGreen'  ,'OrangeRed'     ,'DeepPink'         ,'DarkTurquoise']
  const color2Index = Math.floor($fx.rand() * backgroundColours.length)
  
  const Colours1 =  ['#8B0000'     ,'#4B0082'     ,'#008080'       ,'#006400'          ,'#191970'          ,'#2F4F4F'            ,'#000000'   ,'#800000'  ,'#556B2F'         ,'#800080'  ,'#663399'       ,'#B22222']
  const color1Names= ['DarkRed'    ,'Indigo'      ,'Teal'          ,'DarkGreen'        ,'MidnightBlue'     ,'DarkSlateGray'      ,'Black'     ,'Maroon'   ,'DarkOliveGreen'  ,'Purple'   ,'	RebeccaPurple' ,'FireBrick']
  const color1Index = Math.floor($fx.rand() * backgroundColours.length)



  features.backgroundColour = backgroundColours[backgroundIndex]
  features.color1=Colours1[color1Index]
  features.color2=Colours2[color2Index]

  const readableFeaturesObj = {}
  readableFeaturesObj['Background Color']   = backgroundNames[backgroundIndex]
  readableFeaturesObj['Number of Big Ellipses']=$fx.getParam("number_id")
  readableFeaturesObj['Big Ellipses Color']    = color1Names[color1Index]
  readableFeaturesObj['Number of Small Ellipses']=$fx.getParam("number_id 1")
  readableFeaturesObj['Small Ellipses Color']  = color2Names[color2Index]

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
}

setup()


function drawEllips(ctx, x, y,Width,Height,Rotate, color,linewidth,sblur) {
  ctx.lineCap = 'ROUND'
  ctx.lineWidth =linewidth 
  ctx.beginPath(); 
  ctx.shadowBlur = sblur
  ctx.shadowColor = color;
  ctx.ellipse(x,y,Width,Height,Rotate,0,2*Math.PI)
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

A1=$fx.getParam("number_id");
A2=$fx.getParam("number_id 1");

  Widthbig=$fx.rand()*w/8+w/4;
  Widthsmall=$fx.rand()*Widthbig/2+Widthbig/4;

  color1=features.color1
  color2=features.color2

  linewidth1=w* Widthbig/(10000*A1);
  linewidth2=w* Widthsmall/(10000*A2);
  sblur=w/100;
  for (let i=0;i<A2;i++) {
    Rotate=i*Math.PI/A2;
    drawEllips(ctx, w/2, h/2,Widthsmall,Widthsmall/2,Rotate, color2,linewidth2,sblur)
  }

  ctx.translate(w/2,h/2)
  ctx.rotate(Math.PI/4)
  for (let i=0;i<A1;i++) {
  Rotate=i*Math.PI/A1;
  drawEllips(ctx, 0, 0,Widthbig,Widthbig/2,Rotate, color1,linewidth1,sblur)
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
