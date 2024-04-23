const ratio = 1 / 1
const prefix = 'Bezier 1'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 

definitions = [
  {
    id: "number_id1",
    name: "Number of Curves",
    type: "number",
    options: {         // optional
      min: 3,
      max: 50,
      step: 1,
    },
  },
  {
    id: "number_id2",
    name: "number Of Divisions",
    type: "number",
    options: {         // optional
      min: 4,
      max: 100,
      step: 1,
    },
  }
  ];

  $fx.params(definitions);

const setup = () => {

  const BackgroundColours    =  ['#040720'   ,'#0C090A','#34282C' ,'#151B54'   ,'#033E3E'  ,'#25383C'      ,'#2C3539' ,'#004225'    ,'#483C32','#3B2F2F'    ,'#43302E'     ,'#551606'    ,'#3F000F'        ,'#2F0909'    ,'#2B1B17' ,'#583759'    ,'#36013F'    ,'#2E1A47'        ,'#342D7E'     ]
  const BackgroundrNames =      ['Black Blue','Night'  ,'Charcoal','Night Blue','Deep Teal','DarkSlateGray','Gunmetal','Lotus Green','Taupe'  ,'Dark Coffee','Old Burgundy','Blood Night','Chocolate Brown','Dark Maroon','Midnight','Plum Purple','Deep Purple','Midnight Purple','	Blue Whale']


  const foregroundColours    =  ['#565051'     ,'#C9C1C1'  ,'#98AFC7'  ,'#728FCE'          ,'#0020C2'    ,'#14A3C7'  ,'#EBF4FA','#57FEFF'    ,'#77BFC7'   ,'#01F9C6'    ,'#5F9EA0'  ,'#00A36C','#808000','#08A04B'    ,'#E2F516'              ,'#CCFB5D'  ,'#FFFFCC','#FBB117','#FFA500','#BCB88A','#C9BE62'     ,'#CD853F','#966F33','#665D1E'       ,'#804A00'    ,'#A0522D','#C34A2C'     ,'#B83C08'   ,'#EB5406' ,'#C36241','#FF5F1F'      ,'#FA8072','#FD1C03' ,'#C11B17'      ,'#9F000F'  ,'#CC7A8B'   ,'#FFCBA4'   ,'#F778A1'       ,'#E75480'  ,'#F6358A'   ,'#FA2A55' ,'#F433FF'         ,'#5E5A80','#822EFF'     ,'#C8C4DF','#E9E4D4'  ]
  const foregroundNames =       ['Vampire Gray','Steampunk','Blue Gray','Light Purple Blue','Cobalt Blue','Cyan Blue','Water'  ,'Blue Zircon','Blue Hosta','Bright Teal','CadetBlue','Jade'   ,'Olive'  ,'Irish Green','Yellow Green Grosbeak','Tea Green','Cream'  ,'Beer'   ,'Orange' ,'Sage'   ,'Ginger Brown','Peru'   ,'Wood'   ,'Antique Bronze','Dark Bronze','Sienna' ,'Chestnut Red','Ginger Red','Red Gold','Rust'   ,'Bright Orange','Salmon' ,'Neon Red','Chilli Pepper','Cranberry','Dusky Pink','Deep Peach','Carnation Pink','Dark Pink','Violet Red','Red Pink','Bright Neon Pink','Grape'  ,'Blue Magenta','Viola'  ,'Ash White']




  const BackgroundIndex=Math.floor($fx.rand()*BackgroundColours.length);
  const BackgroundColor=BackgroundColours[BackgroundIndex];

  features.backgroundColour = '#000000'
  features.Color1=BackgroundColor ;
  features.Color2=foregroundColours ;
  features.NumberofCurves=$fx.getParam('number_id1')

  const Color=[];
  const readableFeaturesObj = {}
  readableFeaturesObj['Background Color']=BackgroundrNames[BackgroundIndex]


  for (j=features.NumberofCurves;j>0;j=j-1){
    const colorIndex=Math.floor($fx.rand()*features.Color2.length);
    Color[j]=features.Color2[colorIndex];
    S='Foreground Color'+j.toString()
    readableFeaturesObj[S]=foregroundNames[colorIndex]
  }
  features.Color3=Color;

  readableFeaturesObj['Number of Curves']=$fx.getParam('number_id1')
  readableFeaturesObj['number Of Divisions']=$fx.getParam('number_id2')

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)

 
}

setup()

function drawSmoothClosedBezierCurve(ctx, points,LineWidth,Color) {
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

  ctx.closePath();
  ctx.lineWidth=LineWidth;
  ctx.strokeStyle=Color;
  ctx.shadowBlur=LineWidth;
  ctx.shadowColor=Color;
  ctx.stroke();
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



const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  w= ctx.canvas.width;
  h= ctx.canvas.height;
  
  ctx.fillStyle=features.Color1;
  ctx.fillRect(0,0,w,h);

  ctx.translate(w/2,h/2)
  NumberofCurves=features.NumberofCurves;
  numberOfDivisions=$fx.getParam('number_id2')

  for (j=NumberofCurves;j>0;j=j-1){
  
  Color=features.Color3[j];

  angle=anglesForEqualDivisions(ctx, numberOfDivisions)
  points = [];
  for (i=0; i<angle.length ;i++){
    Z=$fx.rand()*3/4+1/4;
    points[i]=[Z*w/(2*(j^(1/NumberofCurves)))*Math.cos(angle[i]),Z*h/(2*(j^(1/NumberofCurves)))*Math.sin(angle[i])];
  }
  LineWidth=w/(50*(j^(1/NumberofCurves))+numberOfDivisions)
  drawSmoothClosedBezierCurve(ctx, points,LineWidth,Color)

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
