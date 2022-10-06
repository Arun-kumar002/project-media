const express = require("express")
const { PORT, NODE_ENV } = require('./config/index')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const connectDb = require('./config/db')
const authRote = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoute')
const app = express()
const cloudinary = require('cloudinary').v2;
const fileuploader = require('express-fileupload')
const cookieparser = require('cookie-parser')
const jwt = require("jsonwebtoken")

const http = require('http').createServer(app);
const io = require("socket.io")(http);
//copy here
const mysql = require('mysql');
const HandlebarHelper=require('handlebars-helpers');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: "mediaApp"
});
cloudinary.config({
    cloud_name: "dmmfp9rcj",
    api_key: "954588356774862",
    api_secret: "0fmk6pIou8zlLYolbtcINEliCEo"
})

//middleware mount here
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cookieparser())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")

// HandlebarHelper.

//server running in 5000
http.listen(PORT, () => {
    connectDb()
    console.log(`listening on ${PORT}`)
})
//routes  here
app.use('/user', authRote)
app.use('/user', profileRoute)
//file uploader for cloudinary
app.use(fileuploader({
    path: true,
}))

// socket connection 
app.get("/", (req, res) => {

    let cuser;
    let users = [];

    let token = req.cookies.token.token
    let user = jwt.verify(token, 'media')
    let email = user.email;

    // query to fetch current user and all users
    connection.query(`SELECT * FROM user WHERE email='${email}'`, function (err, user, fields) {
        if (err) throw err;
        // console.log("ok");

        // query to fetch current user
        connection.query(`SELECT * FROM user `, function (err, alluser, fields) {
            if (err) throw err;

            // query to fetch posts
            connection.query("SELECT * FROM allposts", function (err, post, fields) {
                if (err) throw err;     
              let posts = []
                post.forEach(element => {
                    posts.push({ ...element })
                });
            cuser = { ...user[0] }
            alluser.forEach(element => {
                users.push({ ...element })
            });
            console.log(posts);

            res.render("home",{cuser, users,posts})
        });
        })
    })

    // connection.query(`SELECT * FROM chat`, function (err, chat, fields) {
    //                 console.log(chat)
    //                 console.log(user);
    //                 res.render('home',{user,chat})

    //         });

})
//chat connection area

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(msg.user);
        console.log(msg.message);
        socket.broadcast.emit('message', msg)
        // let payload = `INSERT INTO chat (username, userchat,receivername) VALUES ('${msg.user}','${msg.message}','${msg.user}')`;
        // connection.query(payload, function (err, result) {
        //     if (err) throw err;
        //     console.log("1 record inserted");
        //     console.log(result);
        //     //chat output here
        // });
        // connection.query(`SELECT * FROM chat`, function (err, result, fields) {
        //     if (result) {
        //         console.log(result);
        //     }
        // });
    })
});


//copy ends


