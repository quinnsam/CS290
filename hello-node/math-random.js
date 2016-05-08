var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

function getRandomIntInclusive(min, max) {
  var content = {}
  content.number = Math.floor(Math.random() * (max - min + 1)) + min;
  return content;
}

app.get('/', function(req, res){
  var randomNum = getRandomIntInclusive(0,100);
  console.log(randomNum.number);
  res.render('home', randomNum);
})


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
