const historyController = require('../controller/HistoryController');
const express = require('express');
const router = express.Router();

router.post('/save',historyController.saveHistory);
router.get('/getHistory',historyController.getHistory);

module.exports = router;