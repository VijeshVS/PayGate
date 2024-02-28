const apiRouter = require('express').Router()

apiRouter.get('/',(req,res)=>{
    res.json({
        msg : "hello world"
    })
})


module.exports = {
    apiRouter
}