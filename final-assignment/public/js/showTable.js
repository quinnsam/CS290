var req = new XMLHttpRequest();

req.open('GET', 'http://52.37.202.83:3000/get');
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        if (response.length) {
            if (document.getElementById("workouts")) {
                var curTable = document.getElementById("workouts");
                curTable.parentNode.replaceChild(buildTable(response), curTable);
            } else {
                document.body.appendChild(buildTable(response));
            }
        }
    } else {
        console.log("Error in network request: " + req.statusText);
    }
});
req.send(null); //send JSON string-formatted object

/*Build Table Function*/
/*Used to construct a HTML table from the response from the server.*/
/*Includes functionality for update and delete buttons in each row*/
function buildTable(data) {
    var newTable = document.createElement("table");
    newTable.id = "workouts";

    var fields = Object.keys(data[0]);
    var headRow = document.createElement("tr");
    for (var i = 1; i < fields.length; i++) {
        var headCell = document.createElement("th");
        headCell.textContent = fields[i];
        headRow.appendChild(headCell);
    }
    newTable.appendChild(headRow);

    data.forEach(function(object) {
        var row = document.createElement("tr");

        for (var i = 1; i < fields.length; i++) {
            var cell = document.createElement("td");
            cell.textContent = object[fields[i]];
            row.appendChild(cell);
        }

        var newForm = document.createElement("form");

        var delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.className = "delete";

        //Add delete button behavior on click
        delButton.addEventListener('click', function(event) {
            var req = new XMLHttpRequest();

            //The hidden attribute rowId is stored in the lastchild of the row.
            var rowId = delButton.parentNode.parentNode.lastChild.value;
            console.log("Client-side passed ID: " + rowId);

            //Create payload for POST query.
            var payload = {
                id: rowId
            };

            req.open('POST', 'http://52.37.202.83:3000/delete');
            req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load', function() {
                if (req.status >= 200 && req.status < 400) {

                    //If query was successful, delete the current row.
                    var curTable = document.getElementById("workouts");
                    var curRowIdx = delButton.parentNode.parentNode.rowIndex; //rowIndex returns index of a row Object
                    curTable.deleteRow(curRowIdx); //{table element}.deleteRow(rowIndex) deletes the specified row in the table
                } else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send(JSON.stringify(payload)); //send JSON string-formatted object
            event.preventDefault();
        });
        newForm.appendChild(delButton);

        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "update";
        updateButton.onclick = function(){
          var rowId = updateButton.parentNode.parentNode.lastChild.value;
          location.href = "http://52.37.202.83:3000/updateForm?id="+rowId;
          event.preventDefault();
        };
        newForm.appendChild(updateButton);

        row.appendChild(newForm);

        //IMPORTANT - Store this id at the the end of the row.
        //It will be accessed using lastChild when deleting and updating.
        var hiddenId = document.createElement("input");
        hiddenId.name = "id" + object.id;
        hiddenId.type = "hidden";
        hiddenId.value = object.id;
        row.appendChild(hiddenId);

        newTable.appendChild(row);
    });
    return newTable;
}
