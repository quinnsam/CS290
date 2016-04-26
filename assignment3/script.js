var newTable = document.createElement("table");
var up = document.createElement("button")
    down = document.createElement("button")
    right = document.createElement("button")
    left = document.createElement("button");

down.textContent = "Down";
down.id = "down";


var mark = document.createElement("button");

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
/*
function moveCell(button,table,cell){
  switch(button.id){
    case "down":
      if (cell.row < table.rows.length-1 && cell.row > 0){
        cell.row += 1;

      }

  }
  return table;
}
*/

var table  = buildTable(newTable,4,4);
table.style.borderCollapse = "collapse";

var currentCell = {col:0, row:1};
table.children[currentCell.row].children[currentCell.col].style.border = "5px solid black";

document.body.appendChild(table);
document.body.appendChild(down);
