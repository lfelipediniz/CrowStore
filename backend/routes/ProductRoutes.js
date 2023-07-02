const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

// router.delete('/removeModel', ProductController.removeModel)
// router.delete('/removeProduct', ProductController.removeProduct)
// router.get('/getModelById', ProductController.getModelById)
// router.get('/getProductId', ProductController.getProductId)
router.get('/getProductById', ProductController.getProductById)
router.get('/getModels', ProductController.getModels)
router.get('/getProducts', ProductController.getProducts)
router.post('/addModel', ProductController.addModel)
router.post('/addProduct', ProductController.addProduct)
// router.put('/updateModel', ProductController.updateModel)
// router.put('/updateProduct', ProductController.updateProduct)

module.exports = router
