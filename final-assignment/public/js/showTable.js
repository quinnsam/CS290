document.addEventListener('DOMContentLoaded', addExButton);

function addExButton() {
    document.getElementById("add").addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        var payload = {
            name: document.getElementById("exName").value,
            reps: document.getElementById("exReps").value
        };
        req.open('POST', 'http://52.37.202.83:3000/add');
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                document.getElementById("testResponse").textContent = JSON.stringify(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload)); //send JSON string-formatted object
        event.preventDefault();
    });
}
