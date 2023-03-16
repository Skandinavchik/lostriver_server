const mongoose = require('mongoose');


const waterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Water Name is required'],
        unique: true,
    },

    serialNumber: {
        type: String,
        required: [true, 'Water Serial Number is required'],
        unique: true,
    },

    guestPrice: {
        type: Number,
        required: [true, 'Guest price is required'],
    },

    memberPrice: {
        type: Number,
        required: [true, 'Member price is required'],
    },
});

const Water = mongoose.model('Water', waterSchema);

module.exports = Water;