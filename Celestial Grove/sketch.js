const ratio = 1 / 1;
const prefix = 'Celestial Grove';

const features = {};
let resizeTmr = null;
let thumbnailTaken = false;

const urlSearchParams = new URLSearchParams(window.location.search);
const urlParams = Object.fromEntries(urlSearchParams.entries());
let forceDownloaded = false;

const animated = false;
let nextFrame = null;

const setup = () => {
  const readableFeaturesObj = {};

  const backgroundColours = [
    '#2F0909', '#2B1B17', '#040720', '#151B54', '#033E3E', '#2C3539', '#254117', '#36013F', '#4B0150', '#550A35', 
    '#3F000F', '#473810', '#004225', '#1F6357', '#25383C', '#191970', '#000000', '#000080', '#3B2F2F', '#3D0C02', 
    '#2E1A47'
  ];
  const backgroundNames = [
    'Dark Maroon', 'Midnight', 'Black Blue', 'Night Blue', 'Deep Teal', 'Gunmetal', 'Dark Forest Green', 'Deep Purple',
    'Dark Purple', 'Purple Lily', 'Chocolate Brown', 'Dark Hazel Brown', 'Lotus Green', 'Dark Green Blue', 
    'DarkSlateGray', 'MidnightBlue', 'Black', 'Navy', 'Dark Coffee', 'Black Bean', 'Midnight Purple'
  ];
  const backgroundIndex = Math.floor($fx.rand() * backgroundColours.length);
  features.backgroundColour = backgroundColours[backgroundIndex];
  readableFeaturesObj.Background = backgroundNames[backgroundIndex];

  const branch1colors = [
    '#DADBDD', '#EEEEEE', '#98AFC7', '#1589FF', '#14A3C7', '#95B9C7', '#6698FF', '#00BFFF', '#5CB3FF', '#BDEDFF', 
    '#B0E0E6', '#E3E4FA', '#9AFEFF', '#16E2F5', '#81D8D0', '#7BCCB5', '#93FFE8', '#50C878', '#728C00', '#08A04B', 
    '#6AA121', '#B0BF1A', '#16F529', '#E2F516', '#FFF8DC', '#FFDAB9', '#FFFF33', '#FFBF00', '#C68E17', '#AF9B60', 
    '#EB5406', '#C36241', '#FF8040', '#F89880', '#F67280', '#F75D59', '#FF0000', '#7D0552', '#E799A3', '#F8B88B', 
    '#FDD7E4', '#F778A1', '#F660AB', '#F52887', '#F535AA', '#FA2A55', '#F433FF', '#822EFF', '#F9B7FF', '#F8F0E3'
  ];
  const branch1Names = [
    'Silver White', 'White Gray', 'Blue Gray', 'Neon Blue', 'Cyan Blue', 'Baby Blue', 'Sky Blue Dress', 
    'DeepSkyBlue', 'Crystal Blue', 'Robin Egg Blue', 'PowderBlue', 'Lavender Blue', 'Electric Blue', 
    'Bright Turquoise', 'Tiffany Blue', 'Blue Green', 'Light Aquamarine', 'Emerald', 'Venom Green', 
    'Irish Green', 'Green Onion', 'Acid Green', 'Neon Green', 'Yellow Green Grosbeak', 'Cornsilk', 
    'PeachPuff', 'Neon Yellow', 'Amber', 'Caramel', 'Bullet Shell', 'Red Gold', 'Rust', 'Mango Orange', 
    'Pink Orange', 'Pastel Red', 'Bean Red', 'Red', 'Plum Velvet', 'Pink Daisy', 'Pastel Orange', 
    'Pig Pink', 'Carnation Pink', 'Dark Hot Pink', 'Hot Deep Pink', 'Neon Pink', 'Red Pink', 
    'Bright Neon Pink', 'Blue Magenta', 'Blossom Pink', 'Off White'
  ];

  const numOfbranches = Math.floor($fx.rand() * 50) + 10;
  const branchcolor = [];

  features.numofBranches = numOfbranches;

  for (let i = 0; i < numOfbranches; i++) {
    const branchIndex = Math.floor($fx.rand() * branch1colors.length);
    branchcolor[i] = branch1colors[branchIndex];

    const S = 'Branch Color ' + (i + 1).toString();
    readableFeaturesObj[S] = branch1Names[branchIndex];
  }

  features.Branchcolor = branchcolor;

  $fx.features(readableFeaturesObj);
  console.table(readableFeaturesObj);
};

setup();

function drawTree(ctx, w, h, color, x, y, depth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = $fx.rand() * (w / 200) + (w / 300);

  if (depth < 13) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - h);
    ctx.stroke();

    const newX = x;
    const newY = y - h / 10;
    const angle = Random(-Math.PI / 6, Math.PI / 6);
    ctx.save();
    ctx.translate(newX, newY);
    ctx.rotate(angle);

    if ($fx.rand() < 0.4) {
      ctx.rotate(0.2);
      ctx.scale($fx.rand() * 0.4 + 0.6, $fx.rand() * 0.4 + 0.6);
      drawTree(ctx, w, h * 0.8, color, 0, 0, depth + 1);
      ctx.rotate(-1.2);
      drawTree(ctx, w, h * 0.8, color, 0, 0, depth + 1);
    } else {
      drawTree(ctx, w, h * 0.8, color, 0, 0, depth);
    }

    ctx.restore();
  }
}

function Random(min, max) {
  return $fx.rand() * (max - min) + min;
}

function drawMoon(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#F5F3CE'; // Moon color
  ctx.shadowColor = '#FFFAE3';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0; // Remove shadow effect after moon is drawn
}

const drawCanvas = async () => {
  window.cancelAnimationFrame(nextFrame);

  const canvas = document.getElementById('target');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = features.backgroundColour;
  ctx.fillRect(0, 0, w, h);

  // Draw moons (1-3)
  const numMoons = Math.floor($fx.rand() * 3) + 1;
  for (let i = 0; i < numMoons; i++) {
    const moonX = $fx.rand() * w;
    const moonY = $fx.rand() * h * 0.5; // Upper half of canvas
    const moonRadius = $fx.rand() * w/10; // Varying sizes
    drawMoon(ctx, moonX, moonY, moonRadius);
  }

  // Draw trees
  for (let i = 0; i < features.numofBranches; i++) {
    const color1 = features.Branchcolor[i];
    const W1 = $fx.rand() * (w / 2) + (w / 3);
    const H1 = $fx.rand() * (h / 3) + (h / 2);
    const x = $fx.rand() * w;
    const y = h;
    const depth = 0;

    drawTree(ctx, W1, H1, color1, x, y, depth);
  }

  if (!thumbnailTaken) {
    $fx.preview();
    thumbnailTaken = true;
  }

  if ('forceDownload' in urlParams && forceDownloaded === false) {
    forceDownloaded = true;
    await autoDownloadCanvas();
    window.parent.postMessage('forceDownloaded', '*');
  }

  if (animated) {
    nextFrame = window.requestAnimationFrame(drawCanvas);
  }
};

const init = async () => {
  window.addEventListener('resize', async () => {
    clearTimeout(resizeTmr);
    resizeTmr = setTimeout(async () => {
      await layoutCanvas();
    }, 100);
  });

  document.addEventListener('keypress', async (e) => {
    e = e || window.event;
    if (e.key === 's' || 'S') autoDownloadCanvas();
  });

  await layoutCanvas();
};

const layoutCanvas = async (windowObj = window, urlParamsObj = urlParams) => {
  windowObj.cancelAnimationFrame(nextFrame);

  const { innerWidth: wWidth, innerHeight: wHeight, devicePixelRatio = 1 } = windowObj;
  let dpr = devicePixelRatio;
  let cWidth = wWidth;
  let cHeight = cWidth / ratio;

  if (cHeight > wHeight) {
    cHeight = wHeight;
    cWidth = wHeight * ratio;
  }

  const canvases = document.getElementsByTagName('canvas');
  Array.from(canvases).forEach((canvas) => canvas.remove());

  let targetHeight = cHeight;
  let targetWidth = targetHeight * ratio;

  if ('forceWidth' in urlParams) {
    targetWidth = parseInt(urlParams.forceWidth);
    targetHeight = Math.floor(targetWidth / ratio);
    dpr = 1;
  }

  targetWidth *= dpr;
  targetHeight *= dpr;

  const canvas = document.createElement('canvas');
  canvas.id = 'target';
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  document.body.appendChild(canvas);

  canvas.style.position = 'absolute';
  canvas.style.width = `${cWidth}px`;
  canvas.style.height = `${cHeight}px`;
  canvas.style.left = `${(wWidth - cWidth) / 2}px`;
  canvas.style.top = `${(wHeight - cHeight) / 2}px`;

  drawCanvas();
};

const autoDownloadCanvas = async () => {
  const canvas = document.getElementById('target');

  const element = document.createElement('a');
  const filename = 'forceId' in urlParams
    ? `${prefix}_${urlParams.forceId.toString().padStart(4, '0')}_${$fx.hash}`
    : `${prefix}_${$fx.hash}`;
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  const imageBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  element.setAttribute('href', window.URL.createObjectURL(imageBlob));

  element.click();

  document.body.removeChild(element);
};

document.addEventListener('DOMContentLoaded', init);



