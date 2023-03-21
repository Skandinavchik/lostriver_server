const express = require('express');
const { getAllUsers, getUser } = require('../controllers/userController');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/')
    .get(getAllUsers);

router.route('/:id')
    .get(getUser);

module.exports = router;