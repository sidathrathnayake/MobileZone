const express = require('express');
const router = express.Router();
const crypto =require('crypto');
const userModel = require('../models/User');
const Error = require('../utils/error_response');
const sendEmail = require('../utils/send_email');
const  { getPrivateData }  = require('../middleware/private_error');
const { protect }  =  require('../middleware/user_protect');

//Protecion
router.get('/user', protect,getPrivateData);

//Register
router.post('/user/userregister', async (req, res, next) => {
    
    const user = new userModel(req.body);

    user.save((err) => {
        if(err){
            return next(new Error('Something went wrong!. Please check and try again.', 400));
        }
        return res.status(201).json({
            success: [true, 'Added successfully'],
            user
        });
    });

});

//Login
router.post('/user/userlogin',async (req,res,next) =>{
    
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword){
        return next(new Error("Please provide an Email and Password...!",400));
    }

    try {
        const user = await userModel.findOne({userEmail}).select("+userPassword");

        if(!user){
            return next(new Error("Invalid credentials...!",401));
        }

        const isMatch = await user.matchPasswords(userPassword);

        if(!isMatch){
            return next(new Error("Invalid Password...!",401));
        }

        sendToken(user, 200, res);

    } catch (error) {
        next(error);       
    }

});

//Forgot Password
router.post('/user/userforgotpassword', async (req,res,next) =>{
    const {userEmail} = req.body;
    
    try {
        const user = await userModel.findOne({userEmail});

        if(!user){
            return next(new Error("Email could not be sent to this email.",404));
        }
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `http://localhost:3000/userresetpassword/${resetToken}`;

        const message = `
            <h1>You have requested to reset your password.</h1>
            <p>Please go to the below link to reset your password.</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `

        try {
            await sendEmail({
                to: user.userEmail,
                subject:"Reset password request",
                text: message
            });

            res.status(200).json({
                success:true,
                data: "Email sent"
            });

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new Error("Email could not be send.!",500));
        }

    } catch (error) {
        next(error);
    }
});

//Reset Password
router.put('/user/userresetpassword/:resetToken', async (req,res,next) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return next(new Error("Invalid reset token",400));
        }

        user.userPassword = req.body.userPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success:true,
            data: "Password reset successfully"
        });

    } catch (error) {
        next(error);
    }

})

//Retrive
router.get('/user/users', (req,res,next) => {
    userModel.find().exec((err, users) => {
        if(err){
            return next(new Error('Can not find any user!', 400));
        }
        return res.status(200).json({
            success:true,
            users
        });
    });
});

//Retrive
router.get('/user/newusers', (req,res,next) => {
    userModel.find().exec((err, users) => {
        if(err){
            return next(new Error('No new users!', 400));
        }
        return res.status(200).json({
            success:true,
            users
        });
    });
});

// Retrive specific data by email

router.get('/user/userdata/:userEmail',(req,res) =>{
    
    let userEmail = req.params.userEmail;
    userModel.findOne({"userEmail":userEmail} ,(err, user ) => {
        if(err){
            return next(new Error("Can not find a user with this email...!",400));
        }
        return res.status(200).json({
            success:true,
            user
        });
    })
})


// Retrive specific data by id
router.get('/user/userdatas/:id',(req,res) =>{
    const userid = req.params.id;
    userModel.findById(userid,(err, user) => {
        if(err){
            return next(new Error("Can not find a user with this id...!",400));
        }
        return res.status(200).json({
            success:true,
            user
        });
    })
})

//Update
router.put('/user/updateuser/:id', (req, res, next) => {
    
    userModel.findByIdAndUpdate(req.params.id, {
        $set:req.body
    },
    (err, user) => {
        if(err){
            return next(new Error('Can not update the data!', 400));
        }
        
        return res.status(200).json({
            success:'Succussfully updated.'
        });
    });
});

//Delete
router.delete('/user/deleteuser/:id', (req, res, next) => {
    userModel.findByIdAndRemove(req.params.id).exec((err, deleteuser) => {
        if(err){
            return next(new Error('Can not delete the data', 400));
        }
        return res.status(200).json({
            success:[true, " Deleted successfully!"],
            deleteuser
        });
    }); 
});

//Token send to the model class
const sendToken  = (user, statusCode, res) =>{
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token
    });
}

module.exports = router;
