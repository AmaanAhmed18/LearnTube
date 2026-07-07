const express = require('express');
const { handleTranscriptRequest } = require('../controllers/transcriptController');

const router = express.Router();

router.post('/transcript', handleTranscriptRequest);

module.exports = router;
