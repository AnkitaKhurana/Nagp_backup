import express from 'express';
import { CatalogDbWrapper } from "../Data/product.data";
import { Producer } from "./producer";
import { Consumer } from "./consumer";
import { Product } from '../Models/product.model';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { ProductQueryResponse } from '../Events/productqueryresponse.event';
import { constants } from '../constants';

export class ProductController {
    private _productDbWrapper: CatalogDbWrapper;
    private _producerClient: Producer;
    private _consumerClient: Consumer;

    constructor() {
        this._productDbWrapper = new CatalogDbWrapper();
        this._consumerClient = new Consumer();
        this._producerClient = new Producer();
        this._consumerClient.Consume();
    }

    public AddProduct = async (req: express.Request, res: express.Response) => {
        let _token = req.headers?.authorization?.split(' ')[1];
        if(_token) {
            let _decodedToken = jwt.decode(_token, {json: true});
            let _role = _decodedToken?.role;
            if(_role !== 'admin') { return res.sendStatus(401); }
        let _product = req.body as Product
        console.log('[ * ] Adding product, ', _product.name);
        let _data:Product;
        _product.id = uuidv4()
        
        return this._productDbWrapper.AddProduct(_product)
            .then((product: Product) => {
                _data = Object.assign({}, product);
                console.log('[ * ] New product ', product.name, ' added');
                return res.status(201).json(_data);
            })
        }
    }

    

    public GetAllProducts = (req: express.Request, res: express.Response) => {
        return this._productDbWrapper.GetAllProducts()
                .then((products: Product[]) => {
                    return res.json({products: products});
                })
    }

    public GetProduct = (req: express.Request, res: express.Response) => {
        let _productId = req.params['productId'];
        return this._productDbWrapper.GetProduct(_productId)
                .then((product: Product | undefined) => {
                    if(product) {
                        return res.json({product: product});
                    }
                    return res.sendStatus(404);
                })
    }

    public CheckProducts = (productsList: Product[], orderId: string) => {
        productsList.forEach((product: Product) => {
            this._productDbWrapper.GetProduct(product.id)
                .then((dbProduct: Product | undefined) => {
                    if(dbProduct && (dbProduct?.quantity < product.quantity)) {
                        this._producerClient.Publish(new ProductQueryResponse(false, orderId), constants.CATALOG_ORDER_QUEUE);
                        return;
                    }
                })
        })
        this._producerClient.Publish(new ProductQueryResponse(true, orderId), constants.CATALOG_ORDER_QUEUE);
        return;
    }
}