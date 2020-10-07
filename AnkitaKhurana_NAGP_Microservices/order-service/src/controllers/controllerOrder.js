const Order = require("../models/modelOrder");
const logger = require('../../logger');

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ username: req.params['username'] });
        logger.info('Finding all orders');
        res.send(orders);
    } catch (err) {
        logger.info(err);
        res.status(500).send(err);
    }
}

const getParticularOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ username: req.params['username'] });
        logger.info('Finding particular orders');
        res.send(orders.orders[req.params['orderId']]);
    } catch (err) {
        logger.info(err);
        res.status(500).send(err);
    }
}

const addOrder = async (req, res, next) => {
    try {
        await Order.findOneAndUpdate({ username: req.params['username'] }, {}, { new: true, upsert: true })
            .then(data => {
                let obj = {
                    products: req.body['products'] ? req.body['products'] : [],
                    quantity: 0,
                    cost: 0
                }
                data.orders.push(obj);
                data.save();
                logger.info('Added order');
                res.send(data);
            }).catch(err => {
                logger.info(err);
                res.status(500).send(err);
            });
    } catch (err) {
        logger.info(err);
        res.status(500).send(err);
    }
}

const placeOrder = async (username, cart) => {
    try {
        await Order.findOneAndUpdate({ username: username }, {}, { new: true, upsert: true })
            .then(data => {
                let obj = {
                    products: cart['products'] ? cart['products'] : [],
                    quantity: cart.quantity,
                    cost: cart.cost,
                    status: 'Placed'
                }
                data.orders.push(obj);
                data.save();
                logger.info('Order placed');
            }).catch(err => {
                // Do nothing
            });
    } catch (err) {
        // Do nothing
    }


}

const updateOrderStatus = async (orderId, username, status) => {
    try {
        await Order.findOneAndUpdate({ username: username }, {}, { new: true, upsert: true })
            .then(data => {
                for (let i = 0; i < data.orders.length; i++) {
                    if (data.orders[i]._id == orderId) {
                        data.orders[i].status = status;
                        break;
                    }
                }
                logger.info('Updated Order Status');
                data.save();
            }).catch(err => {
                // Do nothing 
            });
    } catch (err) {
        // Do nothing 
    }

}



module.exports = {
    getAllOrders,
    getParticularOrder,
    addOrder,
    updateOrderStatus,
    placeOrder
}