import express from "express";
import { UserDbWrapper } from "../Data/user.data";
import { Route } from "./route.interface";
import { UserController } from "../Controllers/user.controller";

export class UserRoute {
    public router: express.Router;
    public _userController: UserController;
    private _routes: Route[];
    constructor() {
        this.router = express.Router();
        this._userController = new UserController();
        
        // Define all the routes starting with '/user' here 
        this._routes = [
            { type: 'delete', path: '/:userName', handlers: [this._userController.DeleteUser]},
            { type: 'post', path: '', handlers: [this._userController.AddUser]},
            { type: 'post', path: '/login', handlers: [this._userController.VerifyCredentials]},
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

