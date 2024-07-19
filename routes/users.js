const express = require('express');
const router = express.Router();
const validation = require('../validator.js');
const userContoller = require('../controllers/users');

router.get('/all-users', userContoller.getAllUsers);

router.get(`/:id`, userContoller.getUserById);

router.put(`/update/:id`, validation.usersValidate, userContoller.updateUser);

router.delete(`/delete/:id`, userContoller.deleteUser);

module.exports = router;
