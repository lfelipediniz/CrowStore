const router = require('express').Router();

const OrController = require('../controllers/OrderController');
router.post('/registerOrder', OrController.registerOrder);

module.exports = router;
