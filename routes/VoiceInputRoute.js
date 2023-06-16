const voiceInputController = require('../controller/VoiceInputController');
const express = require('express');
const router = express.Router();

router.post('/procVoice',voiceInputController.processVoiceInput)

module.exports = router;