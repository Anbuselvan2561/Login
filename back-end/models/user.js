const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator')

const userSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        validate : [validator.isEmail, 'Please Enter Email']
    },
    password : {
        type : String
    }
});

userSchema.methods.isValidPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this.id},process.env.JWT_SECRET)
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;