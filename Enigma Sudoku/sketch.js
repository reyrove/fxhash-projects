const e = Math.min(innerWidth, innerHeight);
let robotoFont;

function preload() {
  robotoFont = loadFont('./Roboto-Bold.ttf');
}

class Sudoku {
  constructor(canvasSize, gridSize) {
    this.canvasSize = canvasSize;
    this.gridSize = gridSize;
    this.cellSize = 0;
    this.gridWidth = 0;
    this.gridX = 0;
    this.gridY = 0;
    this.boxSize = 0;
    this.selectedCells = []; // Track selected cells for erasing
    this.selectedNumber = 1;
    this.grid = [];
    this.lockedCells = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(false)); // Track locked cells
    this.numberValidity = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(true));

    this.correctGrid = []; // Store the correct grid for validation
    this.initialize();
  }

  initialize() {
    const goldenRatio = 1.618;
    this.gridWidth = this.canvasSize / goldenRatio;
    this.cellSize = this.gridWidth / this.gridSize;
    this.boxSize = (this.canvasSize - this.gridWidth) / 2;

    this.gridX = (this.canvasSize - this.gridWidth) / 2;
    this.gridY = (this.canvasSize - this.gridWidth - this.boxSize) / 2;

    this.grid = this.generateSudoku();
    this.correctGrid = JSON.parse(JSON.stringify(this.grid)); // Store the correct solution
    this.removeNumbers(40);
  }

  generateSudoku() {
    let grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(0));
    this.fillGrid(grid);
    return grid;
  }

  fillGrid(grid) {
    let numbers = Array.from({ length: this.gridSize }, (_, i) => i + 1);
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (grid[i][j] == 0) {
          numbers = this.shuffle(numbers);
          for (let num of numbers) {
            if (this.isSafe(grid, i, j, num)) {
              grid[i][j] = num;
              if (this.fillGrid(grid)) return true;
              grid[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor($fx.rand() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  isSafe(grid, row, col, num) {
    for (let x = 0; x < this.gridSize; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false;
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  }

  removeNumbers(count) {
    for (let i = 0; i < count; i++) {
      let row = Math.floor($fx.rand() * this.gridSize);
      let col = Math.floor($fx.rand() * this.gridSize);
      if (this.grid[row][col] !== 0) {
        this.grid[row][col] = 0;
        this.numberValidity[row][col] = true;
      }
    }

    // Lock the remaining filled cells so they cannot be changed by the user
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.grid[i][j] !== 0) {
          this.lockedCells[i][j] = true;
        }
      }
    }
  }

  checkNumberValidity(row, col, num) {
    return this.correctGrid[row][col] === num; // Check against the correct grid
  }

  draw() {
    background(20, 24, 82);
    this.drawGrid();
    this.highlightSelectedCell();
    this.highlightSameNumbers();
    this.highlightRowCol();
    this.drawNumbers();
    this.drawNumberBoxes();

    $fx.preview();
  }

  drawGrid() {
    stroke(100, 100, 200);
    strokeWeight(2);
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        let x = this.gridX + j * this.cellSize;
        let y = this.gridY + i * this.cellSize;
        fill(40, 40, 120);
        rect(x, y, this.cellSize, this.cellSize);
      }
    }

    strokeWeight(4);
    stroke(255, 255, 255);
    for (let i = 0; i <= this.gridSize; i += 3) {
      line(this.gridX + i * this.cellSize, this.gridY, this.gridX + i * this.cellSize, this.gridY + this.gridWidth);
      line(this.gridX, this.gridY + i * this.cellSize, this.gridX + this.gridWidth, this.gridY + i * this.cellSize);
    }
  }

  drawNumbers() {
    textAlign(CENTER, CENTER);
    textSize(this.cellSize * 0.8);
    textStyle(BOLD);
    textFont(robotoFont);

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        let x = this.gridX + j * this.cellSize;
        let y = this.gridY + i * this.cellSize;
        let number = this.grid[i][j];
        if (number != 0) {
          if (this.isSelected(i, j)) {
            fill(255, 140, 140); // Light red for selected invalid numbers
          } else if (!this.numberValidity[i][j]) {
            fill(255, 60, 60); // Red for invalid numbers
          } else if (this.lockedCells[i][j]) {
            fill(255); // White for locked (initial) cells
          } else {
            fill(240, 240, 255); // Soft white for valid numbers
          }
          text(number, x + this.cellSize / 2, y + this.cellSize / 2);
        }
      }
    }
  }

  isSelected(row, col) {
    return this.selectedCells.some(([r, c]) => r === row && c === col);
  }

  toggleSelection(row, col) {
    if (this.isSelected(row, col)) {
      this.selectedCells = this.selectedCells.filter(([r, c]) => r !== row || c !== col);
    } else {
      this.selectedCells.push([row, col]);
    }
    redraw();
  }

  drawNumberBoxes() {
    let boxWidth = this.boxSize / this.gridSize;
    let boxX = (this.canvasSize - (boxWidth * this.gridSize + boxWidth * 0.2 * (this.gridSize - 1))) / 2;
    let boxY = this.canvasSize - this.boxSize;
    let padding = boxWidth * 0.2;

    textAlign(CENTER, CENTER);
    textSize(boxWidth * 0.7);
    textStyle(BOLD);
    textFont(robotoFont);

    for (let i = 0; i < this.gridSize; i++) {
      let x = boxX + i * (boxWidth + padding);
      let y = boxY;

      fill(this.selectedNumber === i + 1 ? color(255, 165, 0) : color(70, 130, 180));
      noStroke();
      rect(x, y, boxWidth, boxWidth, 10);

      fill(255);
      text(i + 1, x + boxWidth / 2, y + boxWidth / 2);
    }
  }

  highlightSelectedCell() {
    if (this.selectedRow !== -1 && this.selectedCol !== -1) {
      fill(200, 100, 255, 150);
      noStroke();
      rect(this.gridX + this.selectedCol * this.cellSize, this.gridY + this.selectedRow * this.cellSize, this.cellSize, this.cellSize);
    }
  }

  highlightSameNumbers() {
    if (this.selectedNumber !== -1) {
      fill(255, 255, 100, 150);
      noStroke();
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          if (this.grid[i][j] === this.selectedNumber) {
            rect(this.gridX + j * this.cellSize, this.gridY + i * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }
    }
  }

  highlightRowCol() {
    if (this.selectedRow !== -1 && this.selectedCol !== -1) {
      fill(60, 180, 200, 150);
      noStroke();

      rect(this.gridX, this.gridY + this.selectedRow * this.cellSize, this.gridWidth, this.cellSize);
      rect(this.gridX + this.selectedCol * this.cellSize, this.gridY, this.cellSize, this.gridWidth);
    }
  }

  mousePressed() {
    let boxWidth = this.boxSize / this.gridSize;
    let boxX = (this.canvasSize - (boxWidth * this.gridSize + boxWidth * 0.2 * (this.gridSize - 1))) / 2;
    let boxY = this.canvasSize - this.boxSize;
    let padding = boxWidth * 0.1;

    if (mouseY > boxY) {
      let boxIndex = Math.floor((mouseX - boxX) / (boxWidth + padding));
      if (boxIndex >= 0 && boxIndex < this.gridSize) {
        this.selectedNumber = boxIndex + 1;
      }
      redraw();
      return;
    }

    let col = Math.floor((mouseX - this.gridX) / this.cellSize);
    let row = Math.floor((mouseY - this.gridY) / this.cellSize);

    if (col >= 0 && col < this.gridSize && row >= 0 && row < this.gridSize) {
      if (!this.lockedCells[row][col]) {
        if (this.numberValidity[row][col] === false) {
          // Delete the number if it's incorrect (red)
          this.grid[row][col] = 0;
          this.numberValidity[row][col] = true; // Reset validity
        } else if (this.checkNumberValidity(row, col, this.selectedNumber)) {
          this.grid[row][col] = this.selectedNumber;
          this.numberValidity[row][col] = true;
          this.lockedCells[row][col] = true; // Lock the cell after placing a correct number
        } else {
          this.grid[row][col] = this.selectedNumber;
          this.numberValidity[row][col] = false;
        }
        redraw();
      } else if (!this.numberValidity[row][col]) {
        // Delete the number if it's incorrect
        this.grid[row][col] = 0;
        this.numberValidity[row][col] = true; // Reset validity
        redraw();
      }
    }
  }
}

let sudoku;

function setup() {
  createCanvas(e, e).parent('canvas-container');
  sudoku = new Sudoku(e, 9);
  noLoop();
}

function draw() {
  sudoku.draw();
}

function mousePressed() {
  sudoku.mousePressed();
}














