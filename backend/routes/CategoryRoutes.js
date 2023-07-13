const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');


router.post('/categories', CategoryController.addCategory);
router.get('/categories', CategoryController.getAllCategories);
router.delete('/categories/:categoryId', CategoryController.deleteCategory);

module.exports = router;
