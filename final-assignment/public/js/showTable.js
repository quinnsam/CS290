var req = new XMLHttpRequest();

req.open('GET', 'http://52.37.202.83:3000/get');
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        if (response.length) {
            document.body.appendChild(buildTable(response));
        }
    } else {
        console.log("Error in network request: " + req.statusText);
    }
});
req.send(null); //send JSON string-formatted object

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

        var delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.className = "delete";
        row.appendChild(delButton);

        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "update";
        row.appendChild(updateButton);

        //IMPORTANT - Store this id at the the end of the row.
        //It will be accessed using lastChild when deleting and updating.
        var hiddenId = document.createElement("input");
        hiddenId.name = "id"+object.id;
        hiddenId.type = "hidden";
        hiddenId.value = object.id;
        row.appendChild(hiddenId);

        newTable.appendChild(row);
    });
    return newTable;
}
