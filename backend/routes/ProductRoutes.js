const router = require('express').Router()

const ProductController = require('../controllers/ProductController')
const Product = require('../models/Products')

router.get('/retrieve', ProductController.retrieve)
router.post('/addType', ProductController.addType)
// router.post('/addModel', ProductController.addModel)
// router.put('/updateType', ProductController.updateType)
// router.put('/updateModel', ProductController.updateModel)
// router.delete('/remove', ProductController.remove)

module.exports = router
