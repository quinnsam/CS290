/*Header - Node.js package modules*/
/*---------------------------------------------------------------*/
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({secret:'SuperSecretPassword'}));

app.set('port', 3000);
/*-----------------------------------------------------------------*/

app.get('/count', function(req,res){
    var context = {};
    context.count = req.session.count || 0;
    req.session.count = context.count+1;
    res.render('count', context);
});

app.post('/count', function(req,res){
    var context = {};
    if (req.body.command === "resetCount"){
        req.session.count = 0;
    }
    context.count = req.session.count || 0;
    req.session.count = context.count + 1;
    res.render('count', context);
})


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
