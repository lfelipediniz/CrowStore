const router = require('express').Router();

const OrController = require('../controllers/OrderController');

const Order = require('../models/Order');

router.post('/', OrController.registerOrder);


module.exports = router;
