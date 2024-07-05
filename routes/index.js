const express = require('express');
const router = express.Router();

const baseController = require('../controllers');

router.get('/', baseController.getName);
router.use('/user', require('./users'));
router.use('/recipe', require('./recipes'));
router.use('/pet', require('./pets'));


module.exports = router;
