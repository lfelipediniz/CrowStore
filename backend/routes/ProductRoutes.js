const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

router.delete('/dropProducts', ProductController.dropProducts)
router.delete('/removeModel/:modelId', ProductController.removeModel)
router.delete('/removeProduct/:productId', ProductController.removeProduct)
router.get('/getModelById/:modelId', ProductController.getModelByIds)
router.get('/getModels/:productId', ProductController.getModels)
router.get('/getProductById/:id', ProductController.getProductById)
router.get('/getProducts', ProductController.getProducts)
router.patch('/dropModels/:productId', ProductController.dropModels)
router.patch('/updateModel/:modelId', ProductController.updateModel)
router.patch('/updateProduct/:productId', ProductController.updateProduct)
router.patch('/setImages/:productId', ProductController.setImages)
router.post('/addModel', ProductController.addModel)
router.post('/addProduct', ProductController.addProduct)

module.exports = router
