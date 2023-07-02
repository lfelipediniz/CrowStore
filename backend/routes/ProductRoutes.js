const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

router.delete('/dropProducts', ProductController.dropProducts)
router.delete('/removeModel/:productId', ProductController.removeModel)
router.delete('/removeProduct/:productId', ProductController.removeProduct)
router.get('/getModelByIds/:productId/:modelId', ProductController.getModelByIds)
router.get('/getModels/:productId', ProductController.getModels)
router.get('/getProductById/:id', ProductController.getProductById)
router.get('/getProducts', ProductController.getProducts)
router.patch('/dropModels/:productId', ProductController.dropModels)
router.patch('/updateModel/:productId/:modelId', ProductController.updateModel)
router.patch('/updateProduct/:productId', ProductController.updateProduct)
router.post('/addModel', ProductController.addModel)
router.post('/addProduct', ProductController.addProduct)

module.exports = router
