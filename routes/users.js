const express = require('express');
const router = express.Router();

const userContoller = require('../controllers/users');

router.get('/all-users', userContoller.getAllUsers);

// routes.get(`/user/:id`, userContoller.getUser);

// routes.post('/create/user', userContoller.createUser);

// routes.put(`/update/user/:id`, userContoller.updateUser);

// routes.delete(`/delete/user/:id`, userContoller.deleteUser);

module.exports = router;
