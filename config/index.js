require('dotenv').config()

module.exports={
    MONGODB_URL:process.env.MONGODB_URL,
    MONGODB_CLOUD_URL:process.env.MONGODB_CLOUD_URL,
    PORT:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES:process.env.JWT_EXPIRES,
    JWT_COOKIE_EXPIRE:process.env.JWT_COOKIE_EXPIRE
};