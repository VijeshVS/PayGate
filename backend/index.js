const express = require("express");
const {apiRouter} = require('./routes/index')
const {userRouter} = require('./routes/user')
const {accountRouter} = require('./routes/account')
const cors = require('cors')
const PORT = 3000

const app = express()

console.log(process.env.MONGO_URL)
console.log("MongoDB connected")

app.use(cors())
app.use(express.json()) 
app.use('/api/v1',apiRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/account',accountRouter)




app.listen(PORT,()=>{
    console.log("Port is running on the port:"+PORT)
})


