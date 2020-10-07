const Product = require("../models/modelProduct");
const logger = require('../../logger');

let getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        logger.info('Sending all products');
        res.send(products);
    } catch (err) {
        logger.info(err);
        res.status(500).send(err);
    }
}

let getProduct = async (req, res, next) => {
    if (req.params && req.params.id) {     
        try {
            const products = await Product.find({ _id: req.params.id });
            logger.info('Sending particular product');
            res.send(products);
        } catch (err) {
            logger.info(err);
            res.status(500).send(err);
        }
    }
    res.status(500);
}

let addProduct = async (req, res, next) => {
    if (!req.body.name) {
        logger.info('Product Name is required');
        return res.status(422).json({ errors: { format: 'Product Name is required' } })
    }

    await Product.create({
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity,
        cost: req.body.cost
    }).then(async product => {
        logger.info('Product created');
        res.send(product);
    }).catch(e => {
        logger.info(e);
        res.status(500).send(e);
    });
}


let deleteProduct = async (req, res, next) => {
    if (!req.params.id) {
        logger.info('Product ID is required');
        return res.status(422).json({ errors: { format: 'Product ID is required' } })
    }
    try {
        await Product.deleteOne({ _id: req.params['id'] });
        logger.info('Product Deleted');
        res.send('deleted');
    }
    catch(e){
        logger.info(e);
        res.status(500);;
    }
}


let editProduct = async (req, res, next) => {
    data = {};
    if (!req.params.id) {
        logger.info('Product ID is required');
        return res.status(422).json({ errors: { format: 'Product ID is required' } })
    }
    if (req.body.name)
        data['name'] = req.body.name;
    if (req.body.type)
        data['type'] = req.body.type;
    if (req.body.quantity)
        data['quantity'] = req.body.quantity;
    if (req.body.cost)
        data['cost'] = req.body.cost;

    await Product.findOneAndUpdate({ _id: req.params['id'] }, data, { new: true, upsert: true }).then(data => {
        logger.info('Product edited');        
        res.send(data);
    }).catch(err => {
        logger.info(err);        
        res.status(500).send(err);
    });

}

const increaseItemCount = async (req, res, next) => {
    if (!req.params.id) {
        logger.info('Product ID is required');        
        return res.status(422).json({ errors: { format: 'Product ID is required' } })
    }

    await Product.findOneAndUpdate({ _id: req.params['id'] }, { $inc: { quantity: 1 } }, { new: true, upsert: true }).then(data => {
        logger.info('Product quantity increased');        
        res.send(data);
    }).catch(err => {
        logger.info(err);        
        res.status(500).send(err);
    });
}

const decreaseItemCount = (req, res, next) => {
    if (!req.params.id) {
        logger.info('Product ID is required');        
        return res.status(422).json({ errors: { format: 'Product ID is required' } })
    }
    Product.findOneAndUpdate({ _id: req.params['id'] }, { $inc: { quantity: -1 } }, { new: true, upsert: true }).then(data => {

        if (data.quantity <= 0) {
            data.quantity = 0;

            Product.findOneAndUpdate({ _id: req.params['id'] }, { quantity: 0 }, { new: true, upsert: true }).then(d => {
                logger.info('Product quantity increased');        
                res.send(d);
            }).catch(err => {
                logger.info(err);        
                res.status(500).send(err);
            });

        }
        else
            res.send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    editProduct,
    increaseItemCount,
    decreaseItemCount
}