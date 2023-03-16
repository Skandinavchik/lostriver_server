const Water = require('../models/waterModel');

exports.getAllWaters = async (req, res) => {

    try {
        const waters = await Water.find();

        res.status(200).json({
            status: 'success',
            result: waters.length,
            data: {
                waters,
            },
        });
    }
    
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    };
};

exports.getWater = async (req, res) => {
    
    try {
        const water = await Water.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                water,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    };
};

exports.createWater = async (req, res) => {

    try {
        const water = await Water.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                water,
            },
        });
    }
    
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        });
    };
};

exports.updateWater = async (req, res) => {

    try {
        const water = await Water.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                water,
            },
        });
    }
    
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

exports.deleteWater = async (req, res) => {

    try {
        await Water.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    
    catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};