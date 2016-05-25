var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var request = require('request');

app.use(express.static('public'));
/*-----------------------------------------------------------------*/

app.get('/reset-table', function(req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err) { //replace your connection pool with the your variable containing the connection pool
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err) {
            context.results = "Table reset";
            res.render('home', context);
        });
    });
});

app.get('/', function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

app.post('/', function(req, res) {
    var context = {};

    //Function: user submits a new item via post.
    if (req.body.addItem) {
        mysql.pool.query('INSERT into workouts (`name`), (`reps`), (`weight`), (`date`), (`lbs`)', [req.body.name || NULL, req.body.reps || 0, req.body.weight || 0, req.body.date, req.body.imperialFlag || 0],
            function(err, results) {
                if (err) {
                    next(err);
                    return;
                }

                mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
                    if (err) {
                        next(err);
                        return;
                    }
                    context.results = JSON.stringify(rows);
                    res.render('home', context);
                });
            });
    }
});


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
