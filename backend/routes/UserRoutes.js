const router = require('express').Router();

const UserController = require('../controllers/UserController');
const User = require('../models/User');

// middleware
const verifyToken = require('../helpers/verify-token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.patch('/edit/:id', verifyToken, UserController.editUser);
router.post('/:id/cart', UserController.addProductToCart);
router.post('/:id/shopping', UserController.addProductToShopping);
router.patch('/:id/cart/finalize', UserController.finalizeCart); // Nova rota para finalizar o carrinho

module.exports = router;
