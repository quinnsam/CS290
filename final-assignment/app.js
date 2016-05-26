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

app.get('/', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.render('home');
    });
});



/*Route handler for GET requests for the workouts table*/
/*Default behavior of GET, returns the workouts table as a JSON string*/
app.get('/get', function(req, res) {
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.send(context.results);
    });
});


/*Function: Route handler for adding an exercise to the database*/
/*Description: adds new row when a POST query is received from the client*/
/*Send a JSON object string in the format: */
/*    payload = {
      name: {string},
      rep: {int},
      weight: {int},
      date: {date},
      lbs: {boolean}
    }
*/
app.post('/add', function(req, res) {
    var context = {};

    //Create new row to be sent to database.
    var post = {
        name: req.body.name,
        reps: req.body.reps,
        weight: req.body.weight,
        date: req.body.date,
        lbs: req.body.lbs
    };

    //Add new row to the database and send back details to update table.
    mysql.pool.query('INSERT INTO workouts SET ?', post,
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
                res.send(context.results);
            });
        });
});

/*Route handler for deleting a row from the database*/
/*Pass to it the id containing the row to be deleted.*/
/*Returns the workouts table after deleting the row.*/
app.post('/delete', function(req, res) {
    var context = {};
    console.log("Server-side delete id: " + req.body.id);
    mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result) {
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
            res.send(context.results);
        });
    });
});


app.get('/updateForm', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = rows;

        //Check the box if lbs boolean is true.
        if (context.results[0].lbs === 1) {
            context.checked = "checked";
        }
        console.log("Current update object: " + JSON.stringify(context.results));
        res.render('updateForm', context);
    });
});

app.post('/updateForm', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.body.id], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        if (result.length == 1) {
            var curVals = result[0];
            var checked = 0;
            if(req.body.lbs){
              checked = 1;
            }
            console.log("req.body with POST: " + JSON.stringify(req.body));
            mysql.pool.query('UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?', [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, checked, req.body.id],
                function(err, result) {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.redirect('/');
                });
        }
    });
});

/*Route handler for updating a row from the database*/
/*Pass to it the id containing the row to be updated.*/
/*Renders the update page and passes it the object matching the id.*/
/*app.post('/update', function(req, res) {
    var context = {};
    console.log("Server-side update id: " + req.body.id);
    mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.body.id], function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        console.log(rows);
        context.results = rows;
        res.redirect('updateForm', context);
    });
});
*/

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
