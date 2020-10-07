import express from "express";
import { Route } from "./route.interface";
import { ProductController } from "../Controllers/product.controller";

export class CatalogRoute {
    public router: express.Router;
    public _productsController: ProductController;
    private _routes: Route[];
    constructor() {
        this.router = express.Router();
        this._productsController = new ProductController();
        
        // Define all the routes starting with '/order' here 
        this._routes = [
            { type: 'get', path: '', handlers: [this._productsController.GetAllProducts]},
            { type: 'post', path: '', handlers: [this._productsController.AddProduct]},
            { type: 'get', path: '/:productId', handlers: [this._productsController.GetProduct]},
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

