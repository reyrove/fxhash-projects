const ratio = 1 / 1
const prefix = 'Maze of Life'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 



const setup = () => {

  const backgroundColours =['#000000','#040720'   ,'#34282C' ,'#3A3B3C'    ,'#151B54'   ,'#151B8D'        ,'#033E3E'  ,'#25383C'                             ,'#3C565B'        ,'#1F6357'        ,'#006A4E'     ,'#4B5320'   ,'#254117'          ,'#004225'    ,'#665D1E'       ,'#473810'         ,'#3B2F2F'    ,'#8B0000'      ,'#660000'  ,'#3F000F'        ,'#2B1B17' ,'#550A35'    ,'#36013F'    ,'#2E1A47'        ,'#FBBBB9'  ,'#F8B88B'      ,'#FF6347']
  const backgroundNames   =['black'  ,'Black Blue','Charcoal','Stormy Gray','Night Blue','Denim Dark Blue','Deep Teal','DarkSlateGray or DarkSlateGrey (W3C)','Blue Moss Green','Dark Green Blue','Bottle Green','Army Green','Dark Forest Green','Lotus Green','Antique Bronze','Dark Hazel Brown','Dark Coffee','DarkRed (W3C)','Red Blood','Chocolate Brown','Midnight','Purple Lily','Deep Purple','Midnight Purple','Deep Rose','Pastel Orange','Tomato (W3C)']
  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)


  const ForegroundColours =  [['#A0CE31','#5F31CE'],
  ['#0EDEF1','#F1210E'],
  ['#0EDEF1','#930EF1','#F1210E','#6CF10E'],
  ['#A33FC0','#C03F9C','#633FC0'],
  ['#D53F2A','#D5942A','#D52A6B'],
  ['#EEEF10','#7EEF10','#EF8110'],
  ['#EA15D0','#EA1566','#9915EA'],
  ['#72C837','#37C844','#BBC837'],
  ['#B7487A','#B2B748','#48B785','#4D48B7'],
  ['#0062FF','#FF00E2','#FF9D00','#00FF1D'],
  ['#46B975','#05FA1C','#DFABC9','#B946A2'],
  ['#8254AB','#05B1FA','#DFB7AB'],
  ['#C1AAD5','#AB546F','#00FF1E'],
  ['#1F07F8','#AB9854','#FFD400'],
  ['#40BFAD','#9A8E65','#FF0100'],
  ['#F10E83','#484330','#F1FF00'],
  ['#707C8F','#C6C0A9','#BDFF00'],
  ['#9D6286','#FA7676','#50AF80'],
  ['#515FAE','#76E6FA','#AF5091'],
  ['#2AD536','#76FAC2','#5052AF'],
  ['#679895','#B10000','#5052AF'],
  ['#98678D','#FFACAC','#EEE9D9'],                              
  ['#F98BE2','#60EDFF','#A5924C'],
  ['#065A58','#FAFFAC','#C4C4C4'],
  ['#BA7645','#C4D100','#FF8A93'],
  ['#0008A8','#4FFF93','#484F33'],
  ['#FFE1E0','#D5C800','#608200'],
  ['#424D78','#B32392','#C7FF27'],
  ['#ED9F12','#DC7FC7','#00A2AC'],
  ['#6E008D','#51CA3E','#CB8585'],
  ['#E50099','#00E6DF','#793333'],
  ['#005391','#DC75DE','#BFBA69'],
  ['#05FA39','#6C1A6E','#69BDBF','#87D0FE'],
  ['#D16C2F','#CFB6B9','#ADF62B','#1C7E70'],
  ['#BE4187','#E29AEE','#D0D0CF','#65821C'],
  ['#686A97','#979568'],
  ['#4D2AD5','#B2D52A'],
  ['#A4D42B','#2BD440','#B9A4EC','#8B7479','#FD6A02','#2BD48B','#241154','#AA5567'],
  ['#A2A35C','#2BD4D3','#4B23AD','#AA5598','#FCC903','#669999','#2BAD23','#C3C68C'],
  ['#DB24D2','#24DBDB','#5E735D','#F4FC56','#E51A29','#2481DB','#212820','#DBE171'],
  ['#20D7DF','#B7B1FF'],
  ['#97688F','#AB87A5'],
  ['#3DA3C2','#63B6CF','#215ADE','#4D7BE5','#9AA35C','#AEB67C','#AB5467','#BC7685'],
  ['#717F8E','#8D99A5','#2B63D4','#5582DD','#D629B2','#DE54C2','#4758B8','#6C79C6']
 ]

  const ForegroundIndex = Math.floor($fx.rand() * ForegroundColours.length)
  console.log(ForegroundColours.length)

  features.ForegroundColour = ForegroundColours[ForegroundIndex]
  features.backgroundColour = backgroundColours[backgroundIndex]
  features.widthdivision =   Math.floor($fx.rand() * 100)+100
  features.heightdivision =  Math.floor($fx.rand() * 100)+100
  features.numOfIt= Math.floor($fx.rand() * 10000)+500


  const readableFeaturesObj = {}
  readableFeaturesObj['Background color'] = backgroundNames [backgroundIndex]
  readableFeaturesObj['Number of Rectangles'] = features.widthdivision*features.heightdivision
  readableFeaturesObj['Number of itterations'] = features.numOfIt


  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
}

setup()



function rules(a, b, c, d, e, f, g, h, i) {
 if (e==1 && a+b+c+d+f+g+h+i<2) return 0
 else if (e==1 && a+b+c+d+f+g+h+i==2) return 1
 else if (e==1 && a+b+c+d+f+g+h+i==3) return 1
 else if (e==1 && a+b+c+d+f+g+h+i>3) return 0
 else if (e==0 && a+b+c+d+f+g+h+i==3) return 1
 else return 0
}


function generateRandomMatrix(rows, cols,R) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = $fx.rand() < R ? 0 : 1;
    }
  }
  return matrix;
}

const drawCanvas = async () => {
  window.cancelAnimationFrame(nextFrame)


  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.fillStyle =features.backgroundColour
  ctx.fillRect(0, 0, w, h)


A1=features.widthdivision;
A2=features.heightdivision;
R=$fx.rand()*0.5+0.4;
let cells = generateRandomMatrix(A2,A1,R);
let cells1 = cells;



for (let p=0;p<=features.numOfIt;p++){
for (let i=1;i<=A1-2;i++){
  for (let j=1;j<=A2-2;j++){
   let a=cells[j-1][i-1]
   let b=cells[j-1][i]
   let c=cells[j-1][i+1]
   let d=cells[j][i-1]
   let e=cells[j][i]
   let f=cells[j][i+1]
   let g=cells[j+1][i-1]
   let h1=cells[j+1][i]
   let i1=cells[j+1][i+1]
    cells1[j][i]=rules(a, b, c, d, e, f, g, h1, i1)
  }
}
cells=cells1;
}

for (let i=0;i<=A1-1;i++){
  for (let j=0;j<=A2-1;j++){
   x=i*w/A1
   y=j*h/A2   
   if (cells[j][i]==1){
    Q=features.ForegroundColour[Math.floor($fx.rand()*features.ForegroundColour.length)]
    ctx.beginPath();
    ctx.fillStyle =Q
    ctx.strokeStyle= Q;
    ctx.rect(x, y, w/A1, h/A2 )
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
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