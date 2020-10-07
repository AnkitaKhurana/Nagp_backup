const { Router } = require('express');
const router = Router();
const {paymentReceived} = require('../controllers/controllerPayment');

// Payment Received for Username , orderID 
router.get('/:username/:orderId', paymentReceived)


module.exports = router;