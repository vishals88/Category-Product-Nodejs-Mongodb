const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

router.get('/', IndexController.getIndex);

module.exports = router;