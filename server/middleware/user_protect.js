const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Error = require('../utils/error_response')

exports.protect = async ( req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new Error("Not authorized access to this route",401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return next(new Error("Can not find a user with this id",404));
        }

        req.user=user;
        next();

    } catch (error) {
        return next(new Error("Not authorized access to this route",401));
    }
}