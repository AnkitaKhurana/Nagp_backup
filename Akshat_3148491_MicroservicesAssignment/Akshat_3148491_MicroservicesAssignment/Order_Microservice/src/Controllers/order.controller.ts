import express from 'express';
import { OrderDbWrapper } from "../Data/order.data";
import { Producer } from "./producer";
import { Consumer } from "./consumer";
import { Order } from '../Models/order.model';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { OrderSuccessEvent } from '../Events/ordersuccess.event';
import { constants } from '../constants';
import { ProductPresentQueryEvent } from '../Events/productpresentquery.event';
import { OrderFailEvent } from '../Events/orderfail.event';

export class OrderController {
    private _orderDbWrapper: OrderDbWrapper;
    private _producerClient: Producer;
    private _consumerClient: Consumer;

    constructor() {
        this._orderDbWrapper = new OrderDbWrapper();
        this._consumerClient = new Consumer();
        this._producerClient = new Producer();
        this._consumerClient.Consume();
    }

    // Add new order to DB, and send created response
    public AddOrder = async (req: express.Request, res: express.Response) => {
        let order = req.body as Order
        console.log('[ * ] Adding order for user, ', order.userName);
        let _data:Order;
        order.id = uuidv4()
        
        return this._orderDbWrapper.Addorder(order)
            .then((order: Order) => {
                _data = Object.assign({}, order);
                console.log('[ * ] New order for ', order.userName, ' added');
                return res.status(201).json(_data);
            })
    }

    public InitializePayment = async (req: express.Request, res: express.Response) => {
        let _orderId = req.params['orderId'];
        console.log('[ * ]initializing payment')
        return this._orderDbWrapper.GetOrder(_orderId)
            .then((order: Order | undefined) => {
                if(order) {
                    console.log('[ * ] Publishing products available query to catalog microservice')
                    this._producerClient.Publish(new ProductPresentQueryEvent(order), constants.ORDER_CATALOG_QUEUE);
                }
                res.sendStatus(200);
            })
    }

    public DeleteOrder = async (req: express.Request, res: express.Response) => {
        let _orderId:string = req.params['orderId']
        console.log('[ * ] deleting order ', _orderId);
        let _order = await this._orderDbWrapper.GetOrder(_orderId);
        if(_order) {
            let _token = req.headers?.authorization?.split(' ')[1];
            if(_token) {
                let _decodedToken = jwt.decode(_token, {json: true});
                let _decodedUserName = _decodedToken?.userName;
                if(_order.userName !== _decodedUserName?.userName) { 
                    console.log('[ * ] anauthorized request ');
                    res.sendStatus(401);
                }
            }
        }
        return this._orderDbWrapper.DeleteOrder(_orderId)
            .then((ok: boolean) => {
                if(ok) {
                    console.log('[ * ] order, ', _orderId, ' deleted');
                }
                return;
            })
            .then(() => {
                return res.sendStatus(204);
            })
    }

    public MarkOrderSuccess = (orderId: string) => {
        return this._orderDbWrapper.SetOrderSuccess(orderId)
                .then((order: Order | undefined) => {
                    if(order) {
                        this._producerClient.Publish(new OrderSuccessEvent(order), constants.ORDER_CART_QUEUE);
                        this._producerClient.Publish(new OrderSuccessEvent(order), constants.ORDER_CATALOG_QUEUE);
                        return;
                    }
                })
    }

    public MarkOrderUnsuccessful = (orderId: string) => {
        return this._orderDbWrapper.SetOrderFail(orderId)
                .then((order: Order | undefined) => {
                    if(order) {
                        console.log('[ * ] publishing order failed event to order.cart and order.catalog queues');
                        this._producerClient.Publish(new OrderFailEvent(order), constants.ORDER_CART_QUEUE);
                        this._producerClient.Publish(new OrderFailEvent(order), constants.ORDER_CATALOG_QUEUE);
                        return;
                    }
                })
    }

    public GetAllOrders = (req: express.Request, res: express.Response) => {
        let _userName = req.body.userName;
        return this._orderDbWrapper.GetAllOrders(_userName)
                .then((orders: Order[]) => {
                    return res.json({orders: orders});
                })
    }

    public GetOrder = (req: express.Request, res: express.Response) => {
        let _orderId = req.params['orderId'];
        return this._orderDbWrapper.GetOrder(_orderId)
                .then((order: Order | undefined) => {
                    if(order) {
                        return res.json({order: order});
                    }
                    return res.sendStatus(404);
                })
    }
}