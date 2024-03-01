const mongoose = require('mongoose')
const {dbURL} = require('./config')
const {Schema} = require('mongoose')

mongoose.connect(dbURL);


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const AccountsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref:"User"} ,
    balance: Number
})

const User = mongoose.model('User',UserSchema)
const Accounts = mongoose.model('Accounts', AccountsSchema)

module.exports = {User,Accounts}