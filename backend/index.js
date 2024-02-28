const express = require("express");
const {apiRouter} = require('./routes/index')
const {userRouter} = require('./routes/user')
const JWT_SECRET = require('./config')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json()) 
app.use('/api/v1',apiRouter)
app.use('api/v1/user',userRouter)

app.listen(3000)


