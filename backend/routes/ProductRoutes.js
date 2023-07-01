const router = require('express').Router()

const ProductController = require('../controllers/ProductController')
const Product = require('../models/Products')

router.get('/retrieve', ProductController.retrieve)
router.post('/add', ProductController.add)
router.put('/update', ProductController.update)
router.delete('/remove', ProductController.remove)
