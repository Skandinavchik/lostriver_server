const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be longer then 2 characters'],
        maxlength: [40, 'Name must have less then 40 characters'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Email must be valid'],
    },

    role: {
        type: String,
        enum: ['guest', 'member', 'host', 'admin'],
        default: 'guest',
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [8, 'Name must be longer then 8 characters'],
        maxlength: [20, 'Name must have less then 20 characters'],
        select: false,
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Password confirmation is reqired'],
        validate: {
            // THIS only works on CREATE and SAVE!!! 
            validator: function(passConfirm) {
                return passConfirm === this.password;
            },

            message: 'Passwods are not the same'
        },
    },

    passwordChangedAt: {
        type: Date,
    },

    photo: {
        type: String,
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.changedPasswordAfter = function(jwtTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;

        return jwtTimestamp < changedTimeStamp;
    }

    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;