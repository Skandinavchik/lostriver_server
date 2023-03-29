const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');

const User = require('../models/userModel');


const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt,
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
            },
        });
        next();
    }

    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Invalid email or password');
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
        });
        next();
    }

    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new Error('There is no token');
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            throw new Error('no user');
        }

        if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new Error('somth went wrong');
        }

        req.user = currentUser;
        next();
    }

    catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error,
        });
    }

};

exports.permitedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error('');
        }

        next();
    };
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) throw new Error('No user');

        console.log(user);

        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave: false});

        const resetURL = `${req.protocol}://${req.get('host')}/api/v1.0/users/resetPassword/${resetToken}`;

        const message = `Forgot password message. Set new password with ${resetURL}`;

        await sendEmail({
            email: req.body.email,
            subject: 'Password reset token(valid for 10 min)',
            message,
        });

        res.status(200).json({
            status: 'success',
            message: 'Token send to email'
        });

        next();
    }
    
    catch (error) {
        user.passwordResetToken = undefined;
        user.passwordExpires = undefined;
        await user.save({validateBeforeSave: false});

        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

exports.resetPassword = (req, res, next) => {
    
    
    next();
};