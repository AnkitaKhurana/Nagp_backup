const { Router } = require('express');
const router = Router();
const {
    getCartDetails,
    addToCart,
    deleteFromCart,
    checkout
} = require('../controllers/controllerCart')


// GET cart details 
router.get('/:username', getCartDetails)
// ADD Product to Cart
router.get('/:username/add/:productId', addToCart)
// Delete product from cart 
router.get('/:username/delete/:productId',deleteFromCart )
// Checkout cart
router.get('/:username/checkout',checkout)

module.exports = router;