var express = require('express');

var app = express();

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.set('port', 3000);

app.use(function(req, res){
  res.type('text/plain');
  res.send(getRandomIntInclusive(0,100)); 
})


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
