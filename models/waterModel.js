const mongoose = require('mongoose');


const waterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
    },

    serialNumber: {
        type: String,
        required: [true, 'Serial Number is required'],
        unique: true,
        trim: true,
    },

    licenseType: {
        type: String,
        required: [true, 'License Type is required'],
        trim: true,
    },

    guestPrice: {
        type: Number,
        required: [true, 'Guest price is required'],
    },

    memberPrice: {
        type: Number,
        required: [true, 'Member price is required'],
    },

    imageCover: {
        type: String,
        // required: [true, 'Cover image is required'],
    },

    gallery: {
        type: [String],
    },

    ratingsAverage: {
        type: Number,
        default: 4.5,
    },

    ratingsQuantity: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
        trim: true,
    },

    seasonStart: {
        type: Date,
        required: [true, 'Season start date is required'],
    },
    seasonEnd: {
        type: Date,
        required: [true, 'Season end date is required'],
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false,
    },
});

const Water = mongoose.model('Water', waterSchema);

module.exports = Water;