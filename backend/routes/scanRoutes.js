const express = require('express');
const { scanBarcode } = require('../controllers/scanController');
const router = express.Router();

router.post('/', scanBarcode);

module.exports = router;
