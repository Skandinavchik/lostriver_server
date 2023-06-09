const express = require('express');
const { getAllUsers, getUser } = require('../controllers/userController');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/')
    .get(getAllUsers);

router.route('/:id')
    .get(getUser);

module.exports = router;