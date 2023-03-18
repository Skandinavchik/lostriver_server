const Water = require('../models/waterModel');

exports.getAllWaters = async (req, res) => {

    try {
        const { name, sort, fields } = req.query;
        // 1a Filtering
        const queryObject = { ...req.query };
        const excudedFields = ['limit', 'page', 'sort', 'fields'];
        excudedFields.forEach(item => delete queryObject[item]);

        // 1b Search by name
        let query = Water.find(name
            ? { 'name': { $regex: `${name}`, $options: 'i' } }
            : queryObject);

        // 2. Sorting
        sort
            ? query = query.sort(sort.replaceAll(',', ' '))
            : query = query.sort('-ratingsAverage');

        // 3. Fields limiting
        fields
            ? query = query.select(fields.replaceAll(',', ' '))
            : query = query.select('-__v');

        // 4. Pagination
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const watersAmount = await Water.countDocuments();
            if (skip >= watersAmount) {
                throw new Error('This page does not exists');
            }
        }

        // Execute query
        const waters = await query;

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