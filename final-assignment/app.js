
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'SuperSecretPassword'
}));

var request = require('request');

app.use(express.static('public'));

app.set('port', 3000);
/*-----------------------------------------------------------------*/

app.get('/home', function(req,res,next){
  var context = {};

  if (!req.session.name){
    res.render('newSession', context);
    console.log("New Page Created");
    return;
  }

  context.name=req.session.name;
  context.weightCount = req.session.weightLog.length || 0;
  context.weight = req.session.weightlog || [];
  res.send(context);
})


app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.post('/home', function(req,res){
  var context = {};

  if (req.body.newLog){
    req.session.name = req.body.name;
    req.session.weightLog = [];
  }
})


app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
