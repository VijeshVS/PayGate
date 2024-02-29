const mongoose = require('mongoose')
const dbURL = require('./config')

mongoose.connect(dbURL);


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User',UserSchema)

module.exports = {User}