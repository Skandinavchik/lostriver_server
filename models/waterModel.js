const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


const waterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Name must be longer then 2 characters'],
        maxlength: [40, 'Name must have less then 40 characters'],
    },

    slug: {
        type: String
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
        enum: {
            values: ['carp', 'grayling', 'trout'],
            message: 'License type is either: carp, grayling and trout',
        },
        validate: [validator.isAlpha, 'License type must only contain characters'],
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
        min: [1, 'Rating must be above 1'],
        max: [5, 'Rating must be below 5'],
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
        select: false,
    },

    prohibited: {
        type: Boolean,
        default: false,
    },
});

waterSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});


// Document middleware

// waterSchema.pre('save', function(next) {
//     console.log('Will save document 📄');
//     next();
// });

// waterSchema.post('save', function(doc, next) {
//     console.log(doc);
//     next();
// });


// Query middleware

waterSchema.pre(/^find/, function(next) {
    this.find({prohibited: {$ne: true}});
    next();
});

// waterSchema.post(/^find/, function(docs, next) {
//     // do something
//     next();
// });

const Water = mongoose.model('Water', waterSchema);

module.exports = Water;