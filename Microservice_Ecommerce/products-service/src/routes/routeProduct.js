const { Router } = require('express');
const { authorizeRequest } = require('../middlewares/middlewareAuthCheck')
const router = Router();
const {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    editProduct,
    increaseItemCount,
    decreaseItemCount
} = require('../controllers/controllerProduct')


// GET all products
router.get('/', getProducts)
// GET product
router.get('/:id', getProduct)
// POST Product (Authorize -  Admin)
router.post('/', authorizeRequest, addProduct)
// DELETE Delete (Authorize -  Admin)
router.delete('/:id', authorizeRequest, deleteProduct)
// EDIT Product (Authorize -  Admin)
router.put('/:id', authorizeRequest, editProduct)
// INCREMENT Quantity
router.get('/inc/:id',authorizeRequest, increaseItemCount);
// DECREMENT Quantity
router.get('/dec/:id',authorizeRequest, decreaseItemCount);



module.exports = router;