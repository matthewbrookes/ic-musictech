var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var crypto = require("crypto");
var AWS = require("aws-sdk");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json({ limit: "5mb" })); // support json encoded bodies

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "database",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const s3 = new AWS.S3({
  region: "eu-west-1"
});

app.post("/create-session/", function(req, res) {
  const { date, location } = req.body;
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query(
        "INSERT INTO sessions (location, date) VALUES (?, DATE(?))",
        [location, date],
        function(error) {
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
      console.error(err);
    }
  });
});

app.get("/next-session/", function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query(
        "SELECT id, date, location FROM sessions ORDER BY id DESC LIMIT 1",
        function(error, results) {
          if (error) throw error;
          connection.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.send({
            id: results[0].id,
            date: results[0].date,
            location: results[0].location
          });
        }
      );
    } else {
      console.error(err);
      res.send(500);
    }
  });
});

app.post("/add-signup/", function(req, res) {
  const { name, session, genre, partner, slot } = req.body;
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query(
        "INSERT INTO signups (name, session, genre, partner, slot) VALUES (?, ?, ?, ?, ?)",
        [name, session, genre, partner, slot],
        function(error) {
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
      console.error(err);
    }
  });
});

app.get("/signups/:sessionId", function(req, res) {
  const { sessionId } = req.params;
  if (isNaN(sessionId)) {
    res.status(400).send("sessionId must be a number");
  } else {
    pool.getConnection(function(err, connection) {
      if (err === null) {
        connection.query(
          "SELECT * FROM signups WHERE session = ?",
          [sessionId],
          function(error, results) {
            connection.release();
            if (error) {
              console.error(error);
              res.send(500);
            } else {
              const jsonArray = results.map(result => ({
                id: result.id,
                name: result.name,
                genre: result.genre,
                partner: result.partner,
                slot: result.slot
              }));
              res.send(jsonArray);
            }
          }
        );
      } else {
        console.error(err);
        res.send(500);
      }
    });
  }
});

app.get("/events/", function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query("SELECT * FROM events ORDER BY date DESC", function(
        error,
        results
      ) {
        connection.release();
        if (error) throw error;
        const jsonArray = results.map(result => ({
          id: result.id,
          title: result.title,
          date: result.date,
          description: result.description,
          image: result.image_url
        }));
        res.send(jsonArray);
      });
    } else {
      console.error(err);
      res.send(500);
    }
  });
});

app.post("/add-event/", function(req, res) {
  const { title, date, description, image } = req.body;
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query(
        "INSERT INTO events (title, date, description, image_url) VALUES (?, DATE(?), ?, ?)",
        [title, date, description, image],
        function(error) {
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
      console.error(err);
    }
  });
});

app.delete("/events/:eventId", function(req, res) {
  const { eventId } = req.params;
  pool.getConnection(function(err, connection) {
    if (err === null) {
      connection.query("DELETE FROM events WHERE id = ?", [eventId], function(
        error
      ) {
        connection.release();
        if (error) {
          console.error(error);
          res.send(500);
        }
        res.send();
      });
    } else {
      res.send(500);
      console.error(err);
    }
  });
});

app.post("/upload-image/", function(req, res) {
  const { data } = req.body;
  const buf = new Buffer(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const key = `image/${crypto
    .createHash("sha1")
    .update(data)
    .digest("hex")}`;
  s3.putObject(
    {
      ACL: "public-read",
      Body: buf,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key
    },
    function(err) {
      if (err) {
        res.send(500);
        console.error(err);
      } else {
        res.send({
          url: `https://s3.eu-west-1.amazonaws.com/${
            process.env.AWS_S3_BUCKET_NAME
          }/${key}`
        });
      }
    }
  );
});

app.listen(8080, function() {
  console.log("%s listening at 8080", app.name);
});
