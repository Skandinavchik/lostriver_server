const express = require('express');
const { getAllWaters, getWater, createWater, updateWater, deleteWater } = require('../controllers/waterController');

const router = express.Router();

router.route('/')
    .get(getAllWaters)
    .post(createWater);

router.route('/:id')
    .get(getWater)
    .patch(updateWater)
    .delete(deleteWater);
    

module.exports = router;