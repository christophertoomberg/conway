// So that ESLint can be happy about the p5 (draw and setup functions),
// Maybe it's not useul to use Eslint rules for p5js.
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
function create2DArray(rows, cols) {
	const array = new Array(cols);
	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(rows);
	}
	return array;
}

function createGrid(rows, cols) {
	const array = create2DArray(rows, cols);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			array[i][j] = Math.floor(Math.random() * 2);
		}
	}
	return array;
}

/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
*/

// If cell to be counted would be out of bounds, extends the counting to the other side.
// Adapted from a Coding Train video.

let grid;
let cols;
let rows;
const resolution = 20;

function countAliveNeighbours(_grid, x, y) {
	let aliveNeighbours = 0;

	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			const col = (x + i + cols) % cols;
			const row = (y + j + rows) % rows;
			aliveNeighbours += _grid[col][row];
		}
	}
	aliveNeighbours -= _grid[x][y];
	return aliveNeighbours;
}

function setup() {
	const width = windowWidth;
	const height = windowHeight;
	createCanvas(2000, 2000);
	cols = width / resolution;
	rows = height / resolution;
	grid = createGrid(cols, rows);
}

function draw() {
	background(0);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			const x = i * resolution;
			const y = j * resolution;
			if (grid[i][j] === 1) {
				fill(255);
				stroke(0);
				rect(x, y, resolution - 1, resolution - 1);
			}
		}
	}
	const tempArray = create2DArray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			const cell = grid[i][j];
			const neighbours = countAliveNeighbours(grid, i, j);

			if (cell === 0 && neighbours === 3) {
				tempArray[i][j] = 1;
			} else if (cell === 1 && (neighbours < 2 || neighbours > 3)) {
				tempArray[i][j] = 0;
			} else {
				tempArray[i][j] = grid[i][j];
			}
		}
	}
	grid = tempArray;
}
