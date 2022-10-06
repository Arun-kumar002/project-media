const express=require('express')
const router=express.Router()
const {getRegisterController,getLoginController,SignupController,LoginController,ChatController,SendFrontData}=require('../controllers/authControllers')
const {check,validationResult}=require('express-validator')

// get Requests
router.get("/register", getRegisterController)
router.get("/login", getLoginController)
router.get('/login/email',SendFrontData)

// post Requests 
router.post('/register',[
    check('firstname','firstname is required').exists(),
    check('lastname','lastname is required').exists(),
    check('email','please enter valid email').isEmail(),
    check('password','password is required').isLength({min:4})
],SignupController)
router.post('/login',LoginController)

router.post('/chat',ChatController)

module.exports=router;