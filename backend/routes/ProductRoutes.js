const router = require('express').Router()

const ProductController = require('../controllers/ProductController')

router.delete('/dropProducts', ProductController.dropProducts)
// router.delete('/dropModels', ProductController.dropModels)
// router.delete('/removeModel', ProductController.removeModel)
// router.delete('/removeProduct', ProductController.removeProduct)
// router.get('/getModelByIds/:productId/:modelId', ProductController.getModelById)
router.get('/getProductById/:id', ProductController.getProductById)
router.get('/getModels/:productId', ProductController.getModels)
router.get('/getProducts', ProductController.getProducts)
router.post('/addModel', ProductController.addModel)
router.post('/addProduct', ProductController.addProduct)
// router.put('/updateModel', ProductController.updateModel)
// router.put('/updateProduct', ProductController.updateProduct)

module.exports = router
