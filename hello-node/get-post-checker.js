var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 3000);

app.get('/getpostchecker',function(req,res){
  /*Build render object from req parameters*/
  var getParameters = [];
  for (var p in req.query){
    getParameters.push({"name":p,"value":req.query[p]});
  }
  var context = {};
  context.reqList = getParameters;
  context.contentType = "GET";
  res.render('getpage',context);
});

app.post('/getpostchecker', function(req,res){
  var postParameters = [];
  for (var p in req.query){
    postParameters.push({"name":p,"value":req.query[p]});
  }

  var postBodyParameters = [];
  for (var p in req.body){
    postBodyParameters.push({"name":p, "value":req.body[p]});
  }

  var context = {};
  context.reqList = postParameters;
  context.reqBody = postBodyParameters;
  context.contentType = "POST";
  res.render('postpage',context);
})

app.use('/getpostchecker',function(req,res){
  var context = {};
  context.contentType = "No";
  res.render('getpostchecker', context);
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
