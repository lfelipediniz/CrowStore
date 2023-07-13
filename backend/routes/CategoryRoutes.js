const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const Category = require("../models/Category")

router.post('/categories', CategoryController.addCategory);
router.get('/categories', CategoryController.getAllCategories);
router.delete("/categories/:categoryName", CategoryController.deleteCategory);

module.exports = router;
