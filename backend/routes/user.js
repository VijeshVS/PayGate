const userRouter = require('express').Router()
const {User} = require('../db')
const z = require('zod')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

const UserValid = z.object({
    username : z.string(),
    email : z.string().email(),
    firstName : z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

userRouter.post('/signup',async (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const obj = {username,email,firstName,lastName,password}

    const response = UserValid.safeParse(obj)

    const foundUser = await User.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if( foundUser || !response.success){
        return res.status(411).json({
            msg : "Email/Username already taken or incorrect input"
        })
    }

    const userCreated = await User.create(obj);

    const userId = userCreated._id;

    const token = jwt.sign({userId},JWT_SECRET)

    res.status(200).json({
        message : "User created successfully",
        token
    })
    
})

userRouter.post('/signin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    //hash the password!!

    const foundUser = await User.findOne({
        $or : [
            {username,password},
            {email,password}
        ]
    })

    if(!foundUser){
        return res.status(411).json({
            message : "Error while logging in !!"
        })
    }

    const userId = foundUser._id;

    const token = jwt.sign({userId},JWT_SECRET)

    res.status(200).json({
        token
    })

})

module.exports = {
    userRouter
}