const express = require('express');
const {
    aliasTopWaters,
    getAllWaters,
    getWater,
    createWater,
    updateWater,
    deleteWater
} = require('../controllers/waterController');
const { protect, permitedTo } = require('../controllers/authController');

const router = express.Router();

router.route('/top-waters')
    .get(aliasTopWaters, getAllWaters)

router.route('/')
    .get(protect, getAllWaters)
    .post(protect, permitedTo('admin'), createWater);

router.route('/:id')
    .get(getWater)
    .patch(updateWater)
    .delete(deleteWater);


module.exports = router;