var restify = require('restify');
var mysql = require('mysql');

const server = restify.createServer({
  name: 'musictech-backend',
  version: '1.0.0'
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'database',
  user     : 'root',
  password : 'password',
  database : 'musictech'
});


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/next-session/', function (req, res, next) {
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
    return next();
  });
});

server.post('/add-signup/', function (req, res, next) {
  const { name, session, genre, partner, slot } = req.body;
  pool.getConnection(function (err, connection) {
    if (err === null) {
      connection.query(`INSERT INTO signups (name, session, genre, partner, slot) VALUES ("${name}", ${session}, "${genre}", "${partner}", "${slot}")`,
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
    }
  });
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
