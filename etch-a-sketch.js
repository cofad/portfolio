/*William Warner*/
/*willrwarner.com*/
/*main.css*/

//Initialization
createGrid(16, 16 * 2);
// writeGridMessage();

//Button Event Handlers
resetButton = document.getElementById("js-etch-a-sketch__btn-reset");
resetButton.addEventListener("click", resetGrid);

clearButton = document.getElementById("js-etch-a-sketch__btn-clear");
clearButton.addEventListener("click", clearGrid);

//Functions
function createGrid(numRows, numCols) {
  for (var i = 0; i < numRows * numCols; i++) {
    var strNumCols = String(numCols);

    //Set-up Grid
    var grid = document.getElementById("js-etch-a-sketch__grid");
    var strGridTemplateColumns = "repeat(" + strNumCols + ",1fr)";
    grid.style.gridTemplateColumns = strGridTemplateColumns;

    //Add divs to grid
    var div = document.createElement("div");
    div.setAttribute("class", "js-etch-a-sketch__grid-item");
    div.setAttribute("id", "js-etch-a-sketch__grid-item-" + String(i));

    div.addEventListener("mouseover", setBackgroundColor);
    grid.appendChild(div);
  }
}

function clearGrid() {
  var gridItems = document.getElementById("js-etch-a-sketch__grid").children;

  for (var i = 0; i < gridItems.length; i++) {
    gridItems[i].style.backgroundColor = "white";
  }
}

function setBackgroundColor() {
  var strRGB1 = String(Math.random() * 254);
  var strRGB2 = String(Math.random() * 254);
  var strRGB3 = String(Math.random() * 254);
  this.style.backgroundColor =
    "rgb(" + strRGB1 + "," + strRGB2 + "," + strRGB3 + ")";
}

function removeGridElements() {
  var grid = document.getElementById("js-etch-a-sketch__grid");

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function resetGrid() {
  var numRows = Number(prompt("Enter the number of rows."));
  var numCols = numRows * 2;

  removeGridElements();
  createGrid(numRows, numCols);
}
