var newTable = document.createElement("table");
var up = document.createElement("button");
up.textContent = "Up";

var down = document.createElement("button")
down.textContent = "Down";

var right = document.createElement("button")
right.textContent = "Right";

var left = document.createElement("button");
left.textContent = "Left";

var mark = document.createElement("button");
mark.textContent = "Mark";

/*Function: Build Table*/
function buildTable(newTable,length,height){
  var headRow = document.createElement("tr");
  for (var i = 0; i < length; i++){
    var headCell = document.createElement("th");
    headCell.textContent = "Header " + (i+1);
    headCell.style.border = "1px solid black";
    headCell.style.padding = "3px 8px";
    headRow.appendChild(headCell);
  }
  newTable.appendChild(headRow);

  for (var i = 0; i < height-1; i++){
    var row = document.createElement("tr")
    for (var j = 0; j < length; j++){
      var cell = document.createElement("td")
      cell.textContent = (i+1) + ", " + (j+1);
      cell.style.border = "1px solid black";
      cell.style.padding = "3px 8px";
      row.appendChild(cell);
    }
    newTable.appendChild(row);
  }
  return newTable;
}


function moveDown(table,cell){
  if (cell.row < table.rows.length-1 && cell.row > 0){
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    cell.row += 1;
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

down.addEventListener("click", function(){
  moveDown(table,currentCell);
})


function moveUp(table, cell){
  if (cell.row > 1){
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    cell.row -= 1;
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

up.addEventListener("click", function(){
  moveUp(table,currentCell);
})


function moveLeft(table, cell){
  if (cell.col > 0){
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    cell.col -= 1;
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

left.addEventListener("click", function(){
  moveLeft(table,currentCell);
})


function moveRight(table, cell){
  if (cell.col < table.rows[cell.row].cells.length-1){
    table.children[cell.row].children[cell.col].style.border = "1px solid black";
    cell.col += 1;
    table.children[cell.row].children[cell.col].style.border = "5px solid black";
  }
}

right.addEventListener("click", function(){
  moveRight(table,currentCell);
})


function markCell(table, cell){
  table.children[cell.row].children[cell.col].style.backgroundColor = "yellow";
}

mark.addEventListener("click", function(){
  markCell(table,currentCell);
})

var table  = buildTable(newTable,4,4);
table.style.borderCollapse = "collapse";
table.style.borderSpacing = "0px";

var currentCell = {col:0, row:1};
table.children[currentCell.row].children[currentCell.col].style.border = "5px solid black";

document.body.appendChild(table);
document.body.appendChild(left);
document.body.appendChild(up);
document.body.appendChild(down);
document.body.appendChild(right);
document.body.appendChild(mark);
