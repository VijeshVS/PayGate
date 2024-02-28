const mongoose = require('mongoose')

mongoose.connect('');


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model('User',UserSchema)

module.exports = {User}