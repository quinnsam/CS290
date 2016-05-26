document.addEventListener('DOMContentLoaded', deleteRow);
var deleteButtons = Array.from(document.getElementsByClassName("delete"));
console.log(deleteButtons);

function deleteRow() {
    deleteButtons.forEach(function(delButton) {
        delButton.addEventListener('click', function(event) {
            var req = new XMLHttpRequest();

            //The hidden attribute rowId is stored in the lastchild of the row.
            var rowId = delButton.parentNode.lastChild.value;
            console.log("Client-side passed ID: " + rowId);
            //Create payload for POST query.
            var payload = {
                id: rowId
            };

            req.open('POST', 'http://52.37.202.83:3000/delete');
            req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load', function() {
                if (req.status >= 200 && req.status < 400) {
                    var curTable = document.getElementById("workouts");
                    var curRowIdx = delButton.parentNode.rowIndex;
                    curTable.deleteRow(curRowIdx);
                } else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send(JSON.stringify(payload)); //send JSON string-formatted object
            event.preventDefault();
        });
    });
}
