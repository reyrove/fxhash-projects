const e = Math.min(innerWidth, innerHeight);
const canvas = { w: e, h: e };

let brushColors = [];
let brushStrokes = [];
let paperTexture;
let dreamyElements = [];
let backgroundColors = [];
const numBrushStrokes = 60;
const numColors = 30;
const numDreamyElements = 20;

function setup() {
    createCanvas(canvas.w, canvas.h);
    noLoop();
    $fx.preview(); // Trigger capture module for image previews
    initializeColors();
    createBackground();
    createBrushStrokes();
    createDreamyElements();
    createPaperTexture();
    drawWatercolorArt();
}

function drawWatercolorArt() {
    drawBackground();
    
    for (let i = 0; i < brushStrokes.length; i++) {
        let stroke = brushStrokes[i];
        drawWatercolorStroke(stroke.x, stroke.y, stroke.color, stroke.size);
    }
    drawDreamyElements();
    applyPaperTexture();
}

function initializeColors() {
    for (let i = 0; i < numColors; i++) {
        brushColors.push(color($fx.rand() * 205 + 50, $fx.rand() * 205 + 50, $fx.rand() * 205 + 50, $fx.rand() * 100 + 50));
    }
}

function createBackground() {
    for (let i = 0; i < numColors; i++) {
        backgroundColors.push(color($fx.rand() * 205 + 50, $fx.rand() * 205 + 50, $fx.rand() * 205 + 50, 255));
    }
}

function drawBackground() {
    let segments = numColors;
    let segmentHeight = canvas.h / segments;
    for (let i = 0; i < segments; i++) {
        fill(backgroundColors[i]);
        rect(0, i * segmentHeight, canvas.w, segmentHeight);
    }
}

function createBrushStrokes() {
    for (let i = 0; i < numBrushStrokes; i++) {
        let x = $fx.rand() * canvas.w;
        let y = $fx.rand() * canvas.h;
        let size = $fx.rand() * (canvas.w / 3 - canvas.w / 8) + canvas.w / 8;
        let colorIndex = floor($fx.rand() * brushColors.length);

        brushStrokes.push({
            x: x,
            y: y,
            color: brushColors[colorIndex],
            size: size
        });
    }
}

function drawWatercolorStroke(x, y, col, size) {
    push();
    translate(x, y);
    rotate($fx.rand() * TWO_PI);
    noStroke();

    // Soft Edge Transitions: Feathered ellipses for soft transitions
    let baseAlpha = col._getAlpha();
    for (let i = 0; i < 7; i++) {
        fill(col);
        ellipse(0, 0, size * ($fx.rand() * 0.2 + 0.9), size * ($fx.rand() * 0.6 + 0.7));
        
        size *= 0.85;
        col.setAlpha(baseAlpha * (1 - i / 7)); // Gradually reduce alpha for soft edges
    }

    // Simulate water blending with slight blur
    drawingContext.filter = 'blur(2px)';
    ellipse(0, 0, size, size);
    drawingContext.filter = 'none';

    // Ink Bleed Edges
    drawInkBleed(x, y, col, size * 1.5);

    pop();
}

function drawInkBleed(x, y, col, maxSize) {
    let bleedColor = color(col);
    bleedColor.setAlpha(30); // Lighter alpha for bleed effect
    noStroke();
    fill(bleedColor);

    for (let r = maxSize; r > 0; r -= maxSize / 10) {
        ellipse(x, y, r, r);
    }
}

function createDreamyElements() {
    for (let i = 0; i < numDreamyElements; i++) {
        let x = $fx.rand() * canvas.w;
        let y = $fx.rand() * canvas.h;
        let size = $fx.rand() * (canvas.w / 5 - canvas.w / 10) + canvas.w / 10;
        let col = color($fx.rand() * 105 + 150, $fx.rand() * 105 + 150, $fx.rand() * 105 + 150, $fx.rand() * 50 + 50);
        let glow = $fx.rand() * 20 + 10;

        dreamyElements.push({ x, y, size, col, glow });
    }
}

function drawDreamyElements() {
    for (let i = 0; i < dreamyElements.length; i++) {
        let elem = dreamyElements[i];
        drawGlowingOrb(elem.x, elem.y, elem.size, elem.col, elem.glow);
    }
}

function drawGlowingOrb(x, y, size, col, glow) {
    push();
    translate(x, y);
    
    // Apply glow effect
    drawingContext.shadowBlur = glow;
    drawingContext.shadowColor = col;
    
    noStroke();
    fill(col);
    ellipse(0, 0, size, size);
    
    drawingContext.shadowBlur = 0; // Reset glow effect
    pop();
}

function createPaperTexture() {
    paperTexture = createGraphics(canvas.w, canvas.h);
    paperTexture.noiseDetail(2, 0.5);
    for (let x = 0; x < canvas.w; x++) {
        for (let y = 0; y < canvas.h; y++) {
            let alpha = paperTexture.noise(x * 0.02, y * 0.02) * 50 + 100;
            paperTexture.stroke(255, alpha);
            paperTexture.point(x, y);
        }
    }
}

function applyPaperTexture() {
    blendMode(OVERLAY);
    image(paperTexture, 0, 0, canvas.w, canvas.h);
    blendMode(BLEND); // Reset blend mode to normal
}

function windowResized() {
    resizeCanvas(canvas.w, canvas.h);
    brushStrokes = [];
    dreamyElements = [];
    createBrushStrokes();
    createDreamyElements();
    drawWatercolorArt();
}








