//William Warner

const GRID_HEIGHT = 200;
const GRID_WIDTH = GRID_HEIGHT*2;

//Initialization
createGrid(16,16*2);

//Button Event Handlers
resetButton = document.getElementsByClassName("js-etch-a-sketch__btn-reset")[0]
resetButton.addEventListener("click", resetGrid);

clearButton = document.getElementsByClassName("js-etch-a-sketch__btn-clear")[0]
clearButton.addEventListener("click", clearGrid);

//Functions
function createGrid(numRows,numCols) {

	for (var i=0; i<(numRows*numCols); i++) {
		var strNumCols = String(numCols);
		var strColWidthPX = String(GRID_WIDTH/numCols);
		var strRowWidthPX = String(GRID_HEIGHT/numRows);

		//Set-up Grid
		var grid = document.getElementsByClassName("js-etch-a-sketch__grid")[0];
		var strGridTemplateColumns = "repeat("+strNumCols+","+strColWidthPX+"px";
		grid.style.gridTemplateColumns = strGridTemplateColumns;
		grid.style.width = String(GRID_WIDTH);

		//Add divs to grid
		var div = document.createElement('div');
		div.setAttribute('class', 'js-etch-a-sketch__grid-item');
		div.setAttribute('id', 'js-etch-a-sketch__grid-item-' + String(i));
		div.style.width = strColWidthPX + "px";
		div.style.height = strRowWidthPX + "px";
		div.addEventListener("mouseover", setBackgroundColor);
		grid.appendChild(div);
	}
}

function clearGrid() {
	var gridItems = document.getElementsByClassName("js-etch-a-sketch__grid")[0].children;

	for (var i=0; i<gridItems.length; i++) {
		gridItems[i].style.backgroundColor = "white";
	}
}

function setBackgroundColor() {
	var strRGB1 = String(Math.random()*254);
	var strRGB2 = String(Math.random()*254);
	var strRGB3 = String(Math.random()*254);
	this.style.backgroundColor = "rgb("+strRGB1+","+strRGB2+","+strRGB3+")";
}

function removeGridElements() {
	var grid = document.getElementsByClassName("js-etch-a-sketch__grid")[0];

	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
}

function resetGrid() {
	var numRows = Number(prompt("Enter the number of rows."));
	var numCols = numRows *2;

	removeGridElements();
	createGrid(numRows, numCols);
}