

exports.getAllWaters = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            message: 'Hello from waters',
        },
    });
};