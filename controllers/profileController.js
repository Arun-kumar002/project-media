const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');

const cloudinary = require('cloudinary').v2;
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'tiger',
   database: "mediaApp"

});

const getProfileController = async (req, res, next) => {
   try {
      let token = req.cookies.token.token
      let user = jwt.verify(token, 'media')
      let email = user.email
      connection.query(`SELECT * FROM user WHERE email='${email}'`, function (err, result, fields) {
         if (err) throw err;
         let user = { ...result[0] }
         // console.log(user);
         res.render("auth/profiles", { user })
      });
   } catch (err) {
      console.log(err)
      res.send(500).json({ success: true, message: "Failed to get profile" })
   }
}

const ProfileController = async (req, res, next) => {
   try {
      let token = req.cookies.token.token
      let user = jwt.verify(token, 'media')
      let email = user.email;
      let { dob, gender, relationship, location, status, details } = req.body;

      // only if image is uploaded
      console.log(req.files)
      if (req.files) {
         let profile = req.files[0];
         cloudinary.uploader.upload(profile.path, { folder: "web-spiders" }, async (err, result) => {
            let profilepic = result.url;

            // query to update the database of currentuser
            let sql = `UPDATE USER SET dob='${dob}',gender='${gender}',relationship='${relationship}',location='${location}',profilepic='${profilepic}',status='${status}', details='${details}' WHERE email = '${email}';`

            connection.query(sql, function (err, result) {
               if (err) throw err;
               // console.log(result.affectedRows + " record(s) updated");
            });
         
            //render here macha
            // res.redirect("/", 201, {cuser, users})
            // res.send("image not ssnt")
         })
      } else {
         res.redirect('/user/profile')
      }
   } catch (error) {
      console.log(error);
   }
}

const PostController = async (req, res, next) => {

   let post = req.files[0];
   let token=req.cookies.token.token
   console.log(token);
   let user=jwt.verify(token,'media') ;  
   let email=user.email;
  console.log(email);

   // cloudinary.uploader.upload(post.path, { resource_type: `${type}`, folder: "post" }, async (err, result) => {
   //    console.log(result);
   //    let userpost = result.url;
   //    console.log(userpost); 
            let payload = `INSERT INTO allposts (userpost,user) VALUES ('${post.path}','${email}')`;
            connection.query(payload, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                console.log(result);
            });
   res.redirect('/',201,{})
   // })
  
}
module.exports = { ProfileController, getProfileController, PostController }