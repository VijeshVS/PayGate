const userRouter = require('express').Router()

userRouter.get('/',(req,res)=>{
    res.json({
        msg : 'Hello user router'
    })
})

module.exports = {
    userRouter
}