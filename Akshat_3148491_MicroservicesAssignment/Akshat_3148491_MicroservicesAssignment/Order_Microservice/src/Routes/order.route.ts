import express from "express";
import { Route } from "./route.interface";
import { OrderController } from "../Controllers/order.controller";

export class OrderRoute {
    public router: express.Router;
    public _orderController: OrderController;
    private _routes: Route[];
    constructor() {
        this.router = express.Router();
        this._orderController = new OrderController();
        
        // Define all the routes starting with '/order' here 
        this._routes = [
            { type: 'delete', path: '/:orderId', handlers: [this._orderController.DeleteOrder]},
            { type: 'post', path: '', handlers: [this._orderController.AddOrder]},
            { type: 'post', path: '/:orderId', handlers: [this._orderController.InitializePayment]},
            { type: 'get', path: '/:orderId', handlers: [this._orderController.GetOrder]},
        ];
        this.createRoutes();
    }

    public createRoutes() {
        this._routes.forEach((route: Route) => {
            switch(route.type) {
                case('get'): {
                    this.router.get(route.path, route.handlers);
                    break;    
                }
                case('delete'): {
                    this.router.delete(route.path, route.handlers);
                    break;
                }
                case('post'): {
                    this.router.post(route.path, route.handlers);
                    break;
                }
            }
        });
    }
}

