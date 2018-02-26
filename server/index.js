var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies

const pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'database',
  user     : 'root',
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

app.get('/next-session/', function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err === null) {
      connection.query('SELECT id, date, location FROM sessions ORDER BY id DESC LIMIT 1',
        function (error, results, fields) {
          if (error) throw error;
          connection.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.send({
            id: results[0].id,
            date: results[0].date,
            location: results[0].location,
          });
        }
      );
    }
  });
});

app.post('/add-signup/', function (req, res) {
  const { name, session, genre, partner, slot } = req.body;
  pool.getConnection(function (err, connection) {
    if (err === null) {
      connection.query("INSERT INTO signups (name, session, genre, partner, slot) VALUES (?, ?, ?, ?, ?)",
                       [name, session, genre, partner, slot],
                       function (error) {
                         connection.release();
                         if (error) {
                           console.error(error);
                           res.send(500);
                         }
                         res.send();
                       }
                      );
    } else {
      res.send(500);
      console.error(err)
    }
  });
});

app.listen(8080, function () {
  console.log('%s listening at 8080', app.name);
});
