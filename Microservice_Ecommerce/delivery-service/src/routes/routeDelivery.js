const { Router } = require('express');
const router = Router();
const {deliveryStatusUpdate} = require('../controllers/controllerDelivery');

// Update deliveryStatusUpdate 
router.get('/:username/:orderId', deliveryStatusUpdate)


module.exports = router;