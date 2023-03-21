const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
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

exports.getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                user
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