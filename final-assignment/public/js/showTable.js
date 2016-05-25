var req = new XMLHttpRequest();

req.open('GET', 'http://52.37.202.83:3000/get');
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);

          /*Insert function to build table here*/

        document.getElementById("testResponse").textContent = JSON.stringify(response);
    } else {
        console.log("Error in network request: " + req.statusText);
    }
});
req.send(null); //send JSON string-formatted object
