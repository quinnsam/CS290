
document.addEventListener('DOMContentLoaded', bindPostButton);

function bindPostButton(){
document.getElementById("binPost").addEventListener('click', function(event){
  var req = new XMLHttpRequest();
  req.open('POST', 'http://httpbin.org/post', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function(){
    if (req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      document.getElementById("binPostContent").textContent = JSON.stringify(response);
    }
    else{
      console.log("Error in network request: "+req.statusText);
    }
  });
  req.send('{foo:bar, baz:bae}'); //send JSON string-formatted object
  event.preventDefault();
});
}
