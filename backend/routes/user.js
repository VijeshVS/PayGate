const userRouter = require('express').Router()
const {User,Accounts} = require('../db')
const z = require('zod')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')

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
        '$or' : [
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

    await Accounts.create({userId,balance: Math.floor(Math.random()*10000)})

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

const updateFirstName = z.string();
const updateLastName = z.string();
const updatePassword = z.string().min(6);

userRouter.put('/', authMiddleware , async (req,res)=>{
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    
    const response1 = firstName?updateFirstName.safeParse(firstName):{success:true};
    const response2 = lastName?updateLastName.safeParse(lastName):{success:true};
    const response3 = password?updatePassword.safeParse(password):{success:true};

    if(!response1.success || !response2.success || !response3.success){
        return res.status(411).json({
            message : 'Error while updating information'
        })
    }

    const filters = {}

    if(password){
        filters['password'] = password
    }
    if(firstName){
        filters['firstName'] = firstName
    }
    if(lastName){
        filters['lastName'] = lastName
    }

    const userId = req.headers.userId;

    await User.findOneAndUpdate({_id:userId},filters)

    res.status(200).json({
        message: "Updated successfully"
    })
})

userRouter.get('/bulk', authMiddleware ,async (req,res)=>{
    const filter = req.query.filter;

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(filter);

    const filteredUsers = await User.find({
        '$or':[
            {firstName:{$regex:searchRgx,$options:"i"}},
            {lastName:{$regex:searchRgx,$options:"i"}}
        ]
    })

    const list = []
    filteredUsers.map((e)=>{
        if(e._id != req.headers.userId)
            list.push({
                firstName:e.firstName,
                lastName:e.lastName,
                _id: e._id
            })
    })

    res.status(200).json({users: list})
})


module.exports = {
    userRouter
}