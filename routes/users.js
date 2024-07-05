const express = require('express');
const router = express.Router();

const userContoller = require('../controllers/users');

router.get('/all-users', userContoller.getAllUsers);

router.get(`/:id`, userContoller.getUserById);

router.post('/create', userContoller.createUser);

router.put(`/update/:id`, userContoller.updateUser);

router.delete(`/delete/:id`, userContoller.deleteUser);

module.exports = router;
