const wordController = require('../controller/WordController')
const express = require('express');
const router = express.Router();

router.post('/save',wordController.saveWord);
router.get('/search',wordController.searchWord);

module.exports = router;