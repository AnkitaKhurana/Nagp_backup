const axios = require('axios');
const Cart = require("../models/modelCart");
const { publishToQueue } = require('../controllers/controllerMessagequeue');
const logger = require('../../logger');

async function findProductDetails(productId) {
    return axios({
        method: 'get',
        url: 'http://localhost:3000/product/' + productId

    });
}

function usernameDoesExist(name) {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/user',
        data: {
            username: name
        }
    });

}

let getCartDetails = (req, res, next) => {
    Cart.find({ username: req.params['username'] }).then(c => {
        cart = c[0];
        if (!cart) {
            usernameDoesExist(req.params['username']).then(res => {
                Cart.create({
                    username: req.params['username'],
                    products: [],
                    quantity: 0,
                    cost: 0
                }).then(cart => {
                    logger.info('Retrieved cart details');
                    res.send(cart);
                }).catch(e => {
                    logger.info(e);
                    res.status(500).send(e);
                });

            }).catch(err => {
                logger.info(err);
                res.status(404).send('No Such User found');
            });
        }
        else res.send(cart);
    }).catch(err => {
        logger.info(err);
        res.status(500).send(err);
    });

}

let addToCart = (req, res, next) => {
    findProductDetails(req.params['productId']).then(p => {
        let product = p.data[0];
        if (product) {
            Cart.findOne({ username: req.params['username'] }).then(row => {
                if (!row) {
                    usernameDoesExist(req.params['username']).then(res => {
                        Cart.create({
                            username: req.params['username'],
                            products: [{ productId: product._id, quantityInCart: 1 }],
                            quantity: 0,
                            cost: 0
                        }).then(cart => {
                            logger.info('Added to cart');
                            res.send(cart);
                        }).catch(e => {
                            logger.info(e);
                            res.status(500).send(e);
                        });

                    }).catch(err => {
                        logger.info(err);
                        res.status(404).send('No Such User found');
                    });
                }
                else {
                    let flag = false;
                    for (var i = 0; i < row.products.length; i++) {
                        if (row.products[i].productId == product._id) {
                            {
                                flag = true;
                                if (row.products[i].quantityInCart + 1 <= product.quantity) {
                                    row.products[i].quantityInCart++;
                                }
                                else {
                                    row.products[i].quantityInCart = product.quantity;
                                }
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        let obj = { productId: product._id, quantityInCart: 1 }
                        row.products.push(obj);
                    }
                    logger.info('Added to cart');
                    row.save();
                    res.send(row);
                }
            }).catch(err => {
                logger.info(err);
                res.status(500).send(err);
            });

        }
        else
            res.sendStatus(404);
    }).catch(err => {
        console.log(err)
        logger.info(err);
        res.status(404).send('No Such product found');
    });
}


let deleteFromCart = (req, res, next) => {
    Cart.findOne({ username: req.params['username'] }).then(row => {
        if (!row) {
            usernameDoesExist(req.params['username']).then(res => {
                Cart.create({
                    username: req.params['username'],
                    products: [],
                    quantity: 0,
                    cost: 0
                }).then(cart => {
                    logger.info('Delete from cart');
                    res.send(cart);
                }).catch(e => {
                    logger.info(e);
                    res.status(500).send(e);
                });

            }).catch(err => {
                logger.info(err);
                res.status(404).send('No Such User found');
            });
        }
        else {
            for (var i = 0; i < row.products.length; i++) {
                if (row.products[i].productId == req.params['productId']) {
                    {
                        if (row.products[i].quantityInCart - 1 > 0) {
                            row.products[i].quantityInCart--;
                        }
                        else {
                            row.products.splice(i, 1);
                        }
                        break;
                    }
                }
            }
            logger.info('Delete from cart');
            row.save();
            res.send(row);
        }
    }).catch(err => {
        logger.info(err);
        res.status(500).send(err);
    });
}


let checkout = async (req, res, next) => {
    try {
        Cart.find({ username: req.params['username'] }).then(c => {
            cart = c[0];
            if (cart) {
                logger.info('Order placed sent to queue');
                if (cart.products.length > 0)
                    publishToQueue({ msg: 'order_placed', data: { username: req.params['username'], cart: cart } });
            }
        }).catch(err => {
            logger.info(err);
            res.status(500).send(err);
        });
        res.send('Order Placed')
    }
    catch (ex) {
        logger.info(ex);
        console.log(ex);
    }
}


module.exports = {
    getCartDetails,
    addToCart,
    deleteFromCart,
    checkout
}