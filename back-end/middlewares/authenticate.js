const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticatedUser = (async (req,res,next) => {

    try{
        const {token} = req.cookies;

        if(!token){
            return res.status(400).send('login first to handle this.!')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next();
    }
    catch(err){
        res.status(400).send(err.message)
    }
})