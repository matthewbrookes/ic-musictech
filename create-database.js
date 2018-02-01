const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'musictech'
});

const tables = [
  "CREATE TABLE sessions (" +
                          "id INT NOT NULL AUTO_INCREMENT," +
                          "date DATE NOT NULL," +
                          "location VARCHAR(50) NOT NULL," +
                          "PRIMARY KEY(id)" +
                        ");",
  "CREATE TABLE signups (" +
                        "id INT NOT NULL AUTO_INCREMENT," +
                        "session INT NOT NULL," +
                        "genre VARCHAR(50) NOT NULL," +
                        "partner VARCHAR(50) NOT NULL," +
                        "slot VARCHAR(50) NOT NULL," +
                        "FOREIGN KEY (session) REFERENCES sessions(id)," +
                        "PRIMARY KEY(id)" +
                      ");"
];

connection.connect();

tables.forEach(function (table) {
  connection.query(table, function (error) {
    if (error) throw (error);
  });
});

const initialData = [
  "INSERT INTO sessions (date, location) VALUES (CURDATE(), 'Metric');"
];

initialData.forEach(function (table) {
  connection.query(table, function (error) {
    if (error) throw (error);
  });
});
connection.end();
