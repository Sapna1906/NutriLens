const express = require('express');
const { updatePreferences, getHistory, addExpiryDate, getExpiryAlerts } = require('../controllers/userController');
const router = express.Router();

router.post('/preferences', updatePreferences);
router.get('/history', getHistory);
router.post('/expiry', addExpiryDate);
router.get('/expiry-alerts', getExpiryAlerts);

module.exports = router;
