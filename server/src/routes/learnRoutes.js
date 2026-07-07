const express = require('express');
const { handleLearnRequest } = require('../controllers/learnController');

const router = express.Router();

router.post('/learn', handleLearnRequest);

module.exports = router;
