var newTable = document.createElement("table");

function buildTable(newTable,length,height){
  var headRow = document.createElement("tr");
  for (var i = 0; i < length; i++){
    var headCell = document.createElement("th");
    headCell.textContent = "testing";
    headRow.appendChild(headCell);
  }
  newTable.appendChild(headRow);

  for (var i = 0; i < height-1; i++){
    var row = document.createElement("tr")
    for (var j = 0; j < length; j++){
      var cell = document.createElement("td")
      row.appendChild(cell);
    }
    newTable.appendChild(row);
  }
  return newTable;
}

document.body.appendChild(buildTable(newTable,4,4));
