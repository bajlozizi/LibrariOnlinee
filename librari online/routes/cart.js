const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/:customerId', controller.getCartByCustomerId);
router.post('/', controller.addToCart);
router.delete('/:id', controller.removeFromCart);
router.put('/:id', controller.updateCartItem);

module.exports = router;
