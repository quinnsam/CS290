document.addEventListener('DOMContentLoaded', addExButton);

function addExButton() {
    document.getElementById("add").addEventListener('click', function(event) {
        var req = new XMLHttpRequest();

        //Check if units boxed was checked for metric or imperial.
        var checked = 0;
        if (document.getElementById("unitCheckBox").value === "checked"){
          checked = 1;
        }

        //Create payload for POST query.
        var payload = {
            name: document.getElementById("exName").value,
            reps: document.getElementById("exReps").value,
            weight: document.getElementById("exWeight").value,
            date: document.getElementById("exDate").value,
            lbs: checked
        };

        req.open('POST', 'http://52.37.202.83:3000/add');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);

                document.body.appendChild(buildTable(response));

                document.getElementById("testResponse").textContent = JSON.stringify(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload)); //send JSON string-formatted object
        event.preventDefault();
    });
}

function buildTable(data) {
    var newTable = document.createElement("table");

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
        row.appendChild(delButton);

        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        row.appendChild(updateButton);

        newTable.appendChild(row);
    });
    return newTable;
}
