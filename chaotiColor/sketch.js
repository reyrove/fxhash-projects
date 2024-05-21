const ratio = 1 / 1
const prefix = 'ChaotiColor'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 



const setup = () => {

  const ForegroundColours =  [['#9F21DE','#60DE21'],
  ['#F20DB2','#0DF24D'],
  ['#1DAEE2','#E2511D','#4ABEE8','#EA7348'],
  ['#C1200F','#0FC120','#200FC1'],
  ['#EEA211','#11EEA2','#A211EE'],
  ['#FAFB04','#04FAFB','#FB04FA'],
  ['#A0D42B','#2BA0D4','#D42BA0'],
  ['#46EC13','#1346EC','#EC1346'],
  ['#E916C0','#E9A816','#16E93F','#1657E9'],
  ['#F00F56','#C7F00F','#0FF0A9','#380FF0'],
  ['#F00F1A','#8BF00F','#0FF0E5','#740FF0'],
  ['#EB1914','#EB8414','#EB147B'],
  ['#EFBB10','#B4EF10','#EF4B10'],
  ['#C0A23F','#9DC03F','#C0623F'],
  ['#A4EB14','#38EB14','#EBC714'],
  ['#45BA4E','#45BA89','#76BA45'],
  ['#29D6A4','#29B1D6','#29D64E'],
  ['#1EBAE1','#1E59E1','#1EE1A6'],
  ['#3A77C5','#423AC5','#3ABDC5'],
  ['#1732E8','#6417E8','#179BE8'],
  ['#673AC5','#AD3AC5','#3A52C5'],
  ['#9216E9','#E916D6','#2916E9'],                              
  ['#DC11EE','#EE1191','#6E11EE'],
  ['#A855AA','#AA5582','#7D55AA'],
  ['#F00FBE','#F00F4D','#F00F4D'],
  ['#D42B85','#D42B31','#CE2BD4'],
  ['#DD0D44','#DD3E0D','#DD0DAC'],
  ['#A55A5C','#A57D5A','#A55A82'],
  ['#B7489F','#9FB748','#489FB7'],
  ['#78B649','#4978B6','#B64978'],
  ['#0EF1BB','#BB0EF1','#F1BB0E'],
  ['#93E01F','#1F93E0','#E01F93'],
  ['#E7BE18','#18E756','#1841E7','#E718A9'],
  ['#6A1DE2','#E21D33','#95E21D','#1DE2CC'],
  ['#47D629','#299DD6','#B829D6','#D66229'],
  ['#816A95','#9A88AA'],
  ['#22DDB9','#4EE4C7'],
  ['#292ED6','#D62984','#D6D129','#29D67B','#808080','#E98DBD','#D62935','#299ED6'],
  ['#E21D93','#A4D1D1','#D4D629','#1A6386','#B84747','#D1A4A4','#29D6A4','#ABD9EF'],
  ['#ADD7A9','#A9A4D1','#E1D466','#971D7E','#048184','#E58400','#F7D8F6','#04FDEB'],
  ['#A47F5B','#5B80A4'],
  ['#2AD86E','#BDD82A'],
  ['#086D58','#0DA685','#0FBF9A','#11DBB0','#1FEEC2','#58F2D1','#92F7E1','#C5FBEF'],
  ['#8D1E03','#C12904','#E53105','#FA4A1F','#FB7251','#FC9981','#FDC3B4','#FEDDD5']
 ]

  const ForegroundIndex = Math.floor($fx.rand() * ForegroundColours.length)

  features.ForekgroundColour = ForegroundColours[ForegroundIndex]
  features.widthdivision = Math.floor($fx.rand()*300)+4;
  features.heightdivision = Math.floor($fx.rand()*300)+4;

  const readableFeaturesObj = {}
  readableFeaturesObj['Number of Rectangles'] = features.widthdivision*features.heightdivision

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
}

setup()



function rules(a, b, c, ruleset) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
 
}

function generateBinaryVector(size) {
  const vector = new Array(size).fill(0); // Pre-fill with zeros
  // Ensure at least one 0 and one 1
  vector[Math.floor($fx.rand() * size)] = 1;

  for (let i = 1; i < size; i++) {
    vector[i] =$fx.rand()< 0.5 ? 0 : 1;
  }
  return vector;
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

  ctx.fillStyle ='black'
  ctx.fillRect(0, 0, w, h)

B=Math.floor($fx.rand()*3)





let ruleset = generateBinaryVector(8);
A1=features.widthdivision;
A2=features.heightdivision;
let cells = generateBinaryVector(A1);


if (B==0){
  for (let j=0;j<=A2;j++){
    //
    for (let i=0;i<=A1-1;i++){
    x=i*canvas.width / A1
    y=j*canvas.width / A2
  
    if (cells[i]==1){
      ctx.beginPath();
      ctx.fillStyle='black'
      ctx.strokeStyle='black'
      ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
      ctx.fill()
      ctx.stroke();
      ctx.closePath();
    }else if(cells[i]==0) {
     ctx.beginPath();
     Q=features.ForekgroundColour[Math.floor($fx.rand() * features.ForekgroundColour.length)]
     ctx.fillStyle=Q
     ctx.strokeStyle=Q
     ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
     ctx.fill()
     ctx.stroke();
     ctx.closePath();
    }
    }
  //
    let cells1=Array(A1).fill(1);
    for (let k=1;k<=A1-2;k++){
     let a=cells[k+1]
     let b=cells[k]
     let c=cells[k-1]
     cells1[k]=rules(a, b, c, ruleset);
    }
    cells=cells1;
  }
}else if (B==1){
for (let j=0;j<=A2;j++){
  //
  for (let i=0;i<=A1-1;i++){
  x=i*canvas.width / A1
  y=j*canvas.width / A2

  if (cells[i]==1){
    ctx.beginPath();
    Q=features.ForekgroundColour[Math.floor($fx.rand() * features.ForekgroundColour.length)]
    ctx.fillStyle=Q
    ctx.strokeStyle=Q
    ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
  }else if(cells[i]==0) {
   ctx.beginPath();
   ctx.fillStyle='black'
   ctx.strokeStyle='black'
   ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
   ctx.fill()
   ctx.stroke();
   ctx.closePath();
  }
  }
//
  let cells1=Array(A1).fill(1);
  for (let k=1;k<=A1-2;k++){
   let a=cells[k+1]
   let b=cells[k]
   let c=cells[k-1]
   cells1[k]=rules(a, b, c, ruleset);
  }
  cells=cells1;
}
}else{
  for (let j=0;j<=A2;j++){
    //
    for (let i=0;i<=A1-1;i++){
    x=i*canvas.width / A1
    y=j*canvas.width / A2
  
    if (cells[i]==1){
      ctx.beginPath();
      ctx.fillStyle='black'
      ctx.strokeStyle='black'
      ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
      ctx.fill()
      ctx.stroke();
      ctx.closePath();
    }else if(cells[i]==0) {
     ctx.beginPath();
     Q=randomRgbColor()
     ctx.fillStyle=Q
     ctx.strokeStyle=Q
     ctx.rect(x,y,canvas.width / A1,canvas.width / A2)
     ctx.fill()
     ctx.stroke();
     ctx.closePath();
    }
    }
  //
    let cells1=Array(A1).fill(1);
    for (let k=1;k<=A1-2;k++){
     let a=cells[k+1]
     let b=cells[k]
     let c=cells[k-1]
     cells1[k]=rules(a, b, c, ruleset);
    }
    cells=cells1;
  }
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
