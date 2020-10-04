function createGrid(rows, cols){
	let array = create2DArray(rows, cols);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			array[i][j] = Math.floor(Math.random() * 2)
		}
	}
	return array;
} 

function create2DArray(rows, cols){
	let array = new Array(cols);
	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(rows)
	}
	return array;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

// If cell to be counted would be out of bounds, extends the counting to the other side.
// Adapted from a Coding Train video.
function countAliveNeighbours(grid, x, y){
	let aliveNeighbours = 0;

	for (let i=-1;i<2;i++) {
		for (let j=-1;j<2;j++){
			let col = (x + i + cols) % cols;
			let row = (y+ j + rows) % rows;
			aliveNeighbours += grid[col][row] 
		}
	}
	aliveNeighbours -= grid[x][y];
	return aliveNeighbours;

}

let grid;
let cols;
let rows;
let resolution = 20;

function setup() {
	createCanvas(2000, 2000);
	cols = width / resolution;
	rows = height / resolution;
	grid = createGrid(cols, rows);
}

function draw() {
	background(0);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * resolution;
			let y = j * resolution;
			if (grid[i][j] == 1) {
				fill(255);
				stroke(0);
				rect(x, y, resolution- 1, resolution - 1);
			}
		}
	}
	let tempArray = create2DArray(cols, rows);
	
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			//sleep(20);
			let cell = grid[i][j];
			let neighbours = countAliveNeighbours(grid, i, j);

			if (cell == 0 && neighbours == 3) {
				tempArray[i][j] = 1;
			}
			else if (cell == 1 && (neighbours < 2 || neighbours > 3)) {
				tempArray[i][j] = 0;
			}
			else {
				tempArray[i][j] = grid[i][j];
			}
		}
	}
	grid = tempArray;

}


