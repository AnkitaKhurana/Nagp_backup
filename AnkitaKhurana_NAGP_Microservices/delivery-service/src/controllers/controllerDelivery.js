const { publishToQueue } = require('./controllerMessagequeue');

let deliveryStatusUpdate = (req, res, next) => {
    let username = req.params['username'], orderId = req.params['orderId'], deliveryStatus = req.body['deliveryStatus'];
    setTimeout(() => {
        publishToQueue({ msg: 'update_delivery', data: { username: username, orderId: orderId, deliveryStatus: deliveryStatus } });
    }, 5000);
    res.sendStatus(200);
}


module.exports = {
    deliveryStatusUpdate
}