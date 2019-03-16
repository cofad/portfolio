//William Warner

//Initialization
createGrid(16,16*2);
// writeGridMessage();

//Button Event Handlers
resetButton = document.getElementsByClassName("js-etch-a-sketch__btn-reset")[0]
resetButton.addEventListener("click", resetGrid);

clearButton = document.getElementsByClassName("js-etch-a-sketch__btn-clear")[0]
clearButton.addEventListener("click", clearGrid);

//Functions
function createGrid(numRows,numCols) {

	for (var i=0; i<(numRows*numCols); i++) {
		var strNumCols = String(numCols);

		//Set-up Grid
		var grid = document.getElementsByClassName("js-etch-a-sketch__grid")[0];
		var strGridTemplateColumns = "repeat("+strNumCols+",1fr)";
		grid.style.gridTemplateColumns = strGridTemplateColumns;

		//Add divs to grid
		var div = document.createElement('div');
		div.setAttribute('class', 'js-etch-a-sketch__grid-item');
		div.setAttribute('id', 'js-etch-a-sketch__grid-item-' + String(i));
		// div.textContent = i;
		// div.style.fontSize = "7px";

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

// function writeGridMessage() {

// 	var messageGridItems = [
// 		33,65,97,129,161,98,99,36,68,100,132,164,  	//H
// 		38,70,102,134,166,													//I
// 		40,72,104,168,															//!
// 		225,257,289,321,353,226,227,228,229,259,291,323,355,261,293,325,357,	//M
// 		231,263,295,327,359,232,233,265,297,329,361,360,	//o
// 		235



// 	];

// 	for(var i=0; i<messageGridItems.length; i++) {
// 		var div = document.getElementById("js-etch-a-sketch__grid-item-"+String(messageGridItems[i]));
// 		div.style.backgroundColor = "rgb(0,0,0)";
// 	}

// }