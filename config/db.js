const mysql = require('mysql');


let connectDb = async () => {
    // create the connection to database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tiger',
        database: "mediaApp"
    });

    connection.connect(async function (err) {
        if (err) throw err;
        console.log("my sql dbConnected!");

        //todo database creation
        // connection.query("CREATE DATABASE mediaApp", function (err) {
        //       if (err) throw err;
        //       console.log("mediaApp Database created");
        //     })

        //todo table create 
        //   let sql = "CREATE TABLE user (firstname VARCHAR(20), lastname VARCHAR(20),mobile VARCHAR(20),email VARCHAR(50),password VARCHAR(10),dob VARCHAR(30),gender VARCHAR(10),relationship VARCHAR(20),location VARCHAR(200),profilepic VARCHAR(4000),status VARCHAR(2000),details VARCHAR(2000),data VARCHAR(2000))";
        //  await connection.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log("Table created......");
        //   });

        //todo chat box table
        // let sql = "CREATE TABLE chats (username VARCHAR(2000),userchat VARCHAR(4000),receivername VARCHAR(2000),data VARCHAR(5000))";
        // await connection.query(sql, function (err, result) {
        //    if (err) throw err;
        //    console.log("Table created......");
        //  });

        //todo post table
        // let sql = "CREATE TABLE allposts (userpost VARCHAR(4000),user VARCHAR(100),data VARCHAR(500),details VARCHAR(500),likes VARCHAR(500),dislikes VARCHAR(500),comments VARCHAR(1000))";
        // await connection.query(sql, function (err, result) {
        //    if (err) throw err;
        //    console.log("Post Table created......");
        //  });

        //todo drop table
        //  await connection.query('DROP TABLE allposts',(err,result)=>{
        //     if(err) throw err;
        //     console.log(result);
        //  })

    })
}
module.exports = connectDb;