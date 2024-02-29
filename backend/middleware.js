const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./config')

function authMiddleware(req,res,next){

    const tokenString = req.headers.authorization;
    const token = tokenString.split(' ')[1]

    try{
        jwt.verify(token,JWT_SECRET);
    }
    catch(e){
        return res.status(403).json({
            msg : "User is not authorized"
        })
    }  

    const userIdObj = jwt.decode(token);
    userId = userIdObj.userId; 

    req.headers.userId = userId;
    next();
}

module.exports = {
    authMiddleware
}