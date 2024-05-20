const ratio = 1 / 1
const prefix = 'Socialism of Shapes'

const features = {} 
let resizeTmr = null 
let thumbnailTaken = false 

const urlSearchParams = new URLSearchParams(window.location.search)
const urlParams = Object.fromEntries(urlSearchParams.entries())
let forceDownloaded = false 

const animated = false
let nextFrame = null 


const setup = () => {

  const backgroundColours =  ['#F5F5F5'         ,'#9AFEFF'      ,'#AAF0D1'   ,'#CCFB5D'  ,'#E3F9A6'      ,'#FED8B1'     ,'#FFFF33'    ,'#BCB88A','#FCDFFF'     ,'#FAAFBE'   ,'#F7CAC9'    ,'#FFCBA4'   ,'#FBD5AB'    ,'#FFF0DB'    ,'#D291BC'      ,'#FEA3AA'    ,'#FFB2D0'    ,'#EDC9AF'    ,'#FFF8DC'       ,'#CCFFFF'    ,'#87CEFA'           ,'#BDEDFF']
  const backgroundNames   =  ['WhiteSmoke (W3C)','Electric Blue','Magic Mint','Tea Green','Organic Brown','Light Orange','Neon Yellow','Sage'   ,'Cotton Candy','Donut Pink','Rose Quartz','Deep Peach','Coral Peach','Light Beige','Pastel Violet','Pastel Pink','Powder Pink','Desert Sand','Cornsilk (W3C)','Light Slate','LightSkyBlue (W3C)','Robin Egg Blue']

  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length)

  const ShadowColours  =['#000000','#040720'   ,'#0C090A','#151B54'   ,'#033E3E'  ,'#25383C'                       ,'#2C3539' ,'#004225'    ,'#483C32','#3D3635'   ,'#3B2F2F'    ,'#43302E'     ,'#800000','#551606'    ,'#2F0909'    ,'#2B1B17'   ,'990012'  ,'#2E1A47'        ,'#36013F'    ,'#4B0150'    ,'#4E5180'     ,'#583759'    ,'#550A35'    ]
  const ShadowNames    =['black'  ,'Black Blue','Night'  ,'Night Blue','Deep Teal','DarkSlateGray or DarkSlateGrey','Gunmetal','Lotus Green','Taupe'  ,'Gray Brown','Dark Coffee','Old Burgundy','Maroon' ,'Blood Night','Dark Maroon','Midnight','Red Wine','Midnight Purple','Deep Purple','Dark Purple','	Purple Navy','Plum Purple','Purple Lily']

  const ShadowIndex   =  Math.floor($fx.rand() * ShadowColours.length)

console.log(ShadowColours.length)

  const foregroundColours = [['#9F21DE','#60DE21'],
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

  features.backgroundColour = backgroundColours[backgroundIndex]
  features.ShadowColor=ShadowColours[ShadowIndex]
  features.lineColours = foregroundColours[Math.floor($fx.rand()*foregroundColours.length)]


  const readableFeaturesObj = {}
  readableFeaturesObj['Background color'] = backgroundNames[backgroundIndex]
  readableFeaturesObj['Shadow color']     = ShadowNames[ShadowIndex]                    

  $fx.features(readableFeaturesObj)
  console.table(readableFeaturesObj)
}

setup()


function Triangle(ctx, x, y, size, angle) {
  const halfHeight = Math.sqrt(3) / 2 * size;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, halfHeight);
  ctx.lineTo(-size, -halfHeight);
  ctx.lineTo(size, -halfHeight); 
  ctx.closePath(); 
  ctx.restore();
}

function Square(ctx, x, y, size, angle) {
  ctx.save(); 

  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(-size, size );
  ctx.lineTo(-size , -size); 
  ctx.lineTo(size , -size ); 
  ctx.lineTo(size , size ); 
  ctx.closePath();
  ctx.restore();
}


function Rectangle(ctx, x, y, size1,size2, angle) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(-size1, size2 ); 
  ctx.lineTo(-size1 , -size2); 
  ctx.lineTo(size1 , -size2 ); 
  ctx.lineTo(size1 , size2 ); 
  ctx.closePath();
  ctx.restore();
}

function shape(ctx, x, y, size, angle) {
  
  Q=Math.floor($fx.rand()*8)
  if (Q==0){
    Square(ctx, x, y, size, angle)
  }else if (Q==1){
    Triangle(ctx, x, y, size, angle)
  }else if (Q==2){
    Triangle(ctx, x, y, size, angle+Math.PI/2)
  }else if (Q==3){
    Triangle(ctx, x, y, size, angle+Math.PI)
  }else if (Q==4){
    Triangle(ctx, x, y, size, angle+3*Math.PI/2)
  }else if (Q==5){
    Rectangle(ctx, x, y, $fx.rand()*size,$fx.rand()*size, angle)
  }else if (Q==6){
    ctx.arc(x,y,size,0,2*Math.PI)
  }
}



const drawCanvas = async () => {

  window.cancelAnimationFrame(nextFrame)

  const canvas = document.getElementById('target')
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  let rez = w/($fx.rand()*100+100);

  ctx.fillStyle = features.backgroundColour
  ctx.fillRect(0, 0, w, h)
  A=Math.floor($fx.rand()*16)
  const space = w/($fx.rand()*40+10);
  const size = w/($fx.rand()*40+20);

  for (let i = -5*space; i < w; i += space) {
    for (let j = -5*space; j < h; j += space) {
      const n = 2*$fx.rand();
      ctx.strokeStyle = features.lineColours[Math.floor($fx.rand()*features.lineColours.length)]; 
      ctx.lineWidth=w/($fx.rand()*600+200)
      ctx.shadowColor=features.ShadowColor
      ctx.shadowBlur=w/($fx.rand()*70+80);


    if (A==0){ 
      S=size*20*$fx.rand()
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + S, j + S);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.moveTo(i + S, j);
        ctx.lineTo(i, j + S / 2);
        ctx.stroke();
        ctx.closePath();
      }
    } else if (A==1){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        ctx.arc(i + size, j + size,size,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.arc(i + size, j + size,$fx.rand()*size,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==2){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        ctx.arc(i + size, j + size,size,2*$fx.rand()*Math.PI,2*$fx.rand()*Math.PI);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.arc(i + $fx.rand()*size, j + $fx.rand()*size,size,2*$fx.rand()*Math.PI,2*$fx.rand()*Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
    } else if (A==3){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        ctx.arc(i + size, j + size,$fx.rand()*size+size,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.arc(i + size, j + $fx.rand()*size,$fx.rand()*size+size,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
    } else if (A==4){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, size,$fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, $fx.rand()*size+size,$fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==5){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, $fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Triangle(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==6){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, $fx.rand()*size+size,Math.PI/2)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Triangle(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,Math.PI/2)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==7){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, $fx.rand()*size+size,Math.PI)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Triangle(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==8){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Triangle(ctx, i + size,  j + size, $fx.rand()*size+size,3*Math.PI/2)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Triangle(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,3*Math.PI/2)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==9){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Square(ctx, i + size,  j + size, size,$fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Square(ctx, i + size,  j + size,$fx.rand()*size+size,$fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==10){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Square(ctx, i + size,  j + size, $fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Square(ctx, i + $fx.rand()*size,  j + $fx.rand()*size,$fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==11){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Square(ctx, i + size,  j + size, $fx.rand()*size+size,Math.PI/4)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Square(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,Math.PI/4)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==12){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        shape(ctx, i + size,  j + size, $fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        shape(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,0)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==13){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        shape(ctx, i + size,  j + size, size,$fx.rand()*size+size,Math.PI)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        shape(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, size,$fx.rand()*size+size,Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==14){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Rectangle(ctx, i + size,  j + size, $fx.rand()*size,$fx.rand()*size+size, 0)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Rectangle(ctx, i + size,  j + size, $fx.rand()*size,$fx.rand()*size+size, $fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
    }else if (A==15){
      if (n < $fx.rand()*1.6+0.1) {
        ctx.beginPath();
        Rectangle(ctx, i + size,  j + size, $fx.rand()*size+size,$fx.rand()*size+size,  $fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        Rectangle(ctx, i + $fx.rand()*size,  j + $fx.rand()*size, $fx.rand()*size+size,$fx.rand()*size+size,  $fx.rand()*Math.PI)
        ctx.stroke();
        ctx.closePath();
      }
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
