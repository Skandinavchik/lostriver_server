const express = require('express');
const { getAllWaters } = require('../controllers/waterController');

const router = express.Router();

router.route('/')
    .get(getAllWaters);

router.route('/:id')
    .get();

module.exports = router;