const router = require('express').Router()

const OrderController = require('../controllers/OrderController')
router.post('/registerOrder', OrderController.registerOrder)

module.exports = router
