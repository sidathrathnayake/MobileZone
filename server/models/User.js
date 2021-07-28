const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required: [true, 'Name field can not be empty!'],
        unique: true
    },
    userEmail:{
        type:String,
        required: [true, 'Email field can not be empty!'],
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email.Please provide a valid email",
        ]
    },
    userPassword:{
        type:String,
        required: [true , 'Password field can not be empty!']
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date 
});

userSchema.pre("save", async function(next){
    if(!this.isModified("userPassword")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.userPassword = await bcrypt.hash(this.userPassword, salt);
    next();

});

userSchema.methods.matchPasswords = async function(userPassword){
    return await bcrypt.compare(userPassword, this.userPassword);  
}

userSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE, }
        );
};

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}

module.exports = mongoose.model('users', userSchema);