const { Router } = require('express');
const router = Router();
const { getAllOrders , getParticularOrder, addOrder} = require('../controllers/controllerOrder');

// Get all user orders  
router.get('/:username/', getAllOrders)
// Get particular user order 
router.get('/:username/:orderId', getParticularOrder)
// POST add new order 
router.post('/:username', addOrder)


module.exports = router;