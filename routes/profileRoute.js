const express=require('express')
const router=express.Router()
const{ProfileController, getProfileController,PostController}=require('../controllers/profileController')
const multer = require('multer')
const storage = require('../config/multer');
let upload = multer({ storage });

router.get("/profile", getProfileController)
router.post('/profile',upload.any(['profilepic']),ProfileController)
router.post('/profile/post',upload.any(['post']),PostController)


module.exports=router;