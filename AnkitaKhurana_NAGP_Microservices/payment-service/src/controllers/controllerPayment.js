const { publishToQueue} = require('./controllerMessagequeue');

let paymentReceived = async(req, res, next) => {
    let username = req.params['username'], orderId = req.params['orderId'];
    setTimeout(() => {
        publishToQueue({ msg:'payment_received',data:{username: username, orderId: orderId }});       
    }, 5000);
    res.sendStatus(200);
}


module.exports = {
    paymentReceived
}