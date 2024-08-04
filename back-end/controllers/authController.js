const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwt');

//register
exports.registerUser = (async (req, res, next) => {
    const {name, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).send('user already exists')
    }
    try{
        const user = await User.create({
            name,
            email,
            password : hashPassword
        });

        res.status(200).send(user)

    }
    catch(err){

        res.status(400).send(err.message)

    }
});

//login user

exports.loginUser =  (async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!email || !password){
            return res.status(400).send('Invalid Email or Password')

        };
        
        if(!user){
            return res.status(400).send('Invalid Email or Password')
        };

        if(! await user.isValidPassword(password)){
            return res.status(400).send('Invalid email or password')
        }

        sendToken(user,200,res)
    }

    catch(err){
        res.status(400).send(err)
    }
});

//logout

exports.logoutUser =(req, res, next) => {
    res.cookie('token',null)
    .status(200)
    .json({
        success : true,
        message : 'Logged Out'
    })
}

//get user profile

exports.getUserProfile = (async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success : true,
            user
        })
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

//update password

exports.updatePassword = (async(req,res, next) => {

    const {password, changePassword} = req.body;
    const hashPassword = await bcrypt.hash(changePassword,10);

    try{
        const user = await User.findByIdAndUpdate(req.user.id);
        //check old password
        if(!await user.isValidPassword(password)){
            return res.status(400).send('invalid password')
        }

        //assigning a new password
        user.password = hashPassword;
        await user.save();

        res.status(200).json({
            success : true,
            user
        })

    }
    catch(err){
        res.status(400).json(err.message)

    }
});

exports.updateProfile = (async (req,res,next) =>{

    const {name, email} = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{new : true});
        user.name = name;
        user.email = email;
        await user.save();

        res.status(200).json({
            success : true,
            user
        })

    }
    catch(err){
        res.status(400).json(err.message)
    }

});
    
    
    
      
 
