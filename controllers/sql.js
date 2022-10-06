// get the client
const mysql = require('mysql');

// create the connection to database
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tiger',
    database: "media"
});

connection.connect(async function(err) {
    if (err) throw err;
    console.log("my sql dbConnected!");
    //database created
    // connection.query("CREATE DATABASE mydbfirst", function (err) {
    //     if (err) throw err;
    //     console.log("Database created");
    //   });
    //table create 
    //   let sql = "CREATE TABLE arun (name VARCHAR(20), address VARCHAR(20))";
    //  await connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created......");
    //   });
     //insert data
    //   let payload = "INSERT INTO arun (name, address) VALUES ('captain', 'tamilnadu')";
    //   connection.query(payload, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    //     console.log(result);
    //   });
    // connection.query("SELECT * FROM arun", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //   });
    //   let update = "UPDATE arun SET address = 'arun' WHERE address = 'captain'";
    //   connection.query(update, function (err, result) {
    //     if (err) throw err;
    //     console.log(result.affectedRows + " record(s) updated");
    //   });

  });

// // simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );