const mysql = require('mysql');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: "mediaApp"
});

let token;

// get requests
const getRegisterController = (req, res) => {
    res.render("auth/register")
}

const getLoginController = (req, res) => {
    res.render("auth/login")
}

// post requests
const SignupController = async (req, res, next) => {
    try {
        let profilepic = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';
        let { firstname, lastname, mobile, email, password } = req.body;

        //express validation
        let error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error)
            let alert = error.array()
            res.render("auth/register")
        } else {
            // creation of token
            token = jwt.sign({ ...req.body }, 'media', { expiresIn: "100d" })

            //creation of cookie
            res.cookie('token', { token }, {
                signed: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 5
            });

            // insert the register data to table
            let payload = `INSERT INTO user (firstname, lastname,mobile,email,password,profilepic) VALUES ('${firstname}','${lastname}','${mobile}','${email}','${password}','${profilepic}')`;
            connection.query(payload, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                console.log(result);
            });
            // fetching user data from table
            // connection.query("SELECT * FROM user", function (err, result, fields) {
            //     if (err) throw err;
            //     console.log(result);
            // });
            res.render('auth/login')
        };
    } catch (error) {
        res.render("auth/register")
    }
}


let frontVariable;

const LoginController = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        connection.query(`SELECT * FROM user WHERE email='${email}'`, function (err, result, fields) {
            if (err) {
                res.render("auth/login")
            }
            if (0 in result) {
                let useremail = result[0].email
                let userpassword = result[0].password
                if (password == userpassword && email == useremail) {
                    frontVariable = req.body
                    res.redirect('/user/profile')
                } else {
                    res.render("auth/login")
                }
            } else {
                res.render("auth/login")
            }
        });
    } catch (error) {
        res.render("auth/login")
    }

}

const SendFrontData = async (req, res, next) => {
    res.send(frontVariable)
}

const ChatController = async (req, res, next) => {
    try {
        let { username, userchat } = req.body;
        // let chat = []
        // chat.push(userchat)
        // chat.push(username)
        // console.log(chat);
        let payload = `INSERT INTO chat1 (username, userchat) VALUES ('${username}','${userchat}')`;
        connection.query(payload, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result);
            //chat output here
        });
        connection.query(`SELECT * FROM chat1`, function (err, result, fields) {
            if (result) {
                console.log(result);
            }
        });
        //render here
        res.end('ok')
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getRegisterController, getLoginController, SignupController, LoginController, ChatController, SendFrontData }