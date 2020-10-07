import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDbWrapper } from "../Data/user.data";
import { Producer } from "./producer";
import { User } from "../Models/user.model";
import { UserAddedEvent } from "../Events/UserAdded.event";
import { UserDeletedEvent } from "../Events/UserDeleted.event";
import { UserAuth } from "../Models/userauth.model";
import { constants } from '../constants';

export class UserController {
    private _userDbWrapper: UserDbWrapper;
    private _producerClient: Producer;
    constructor() {
        this._userDbWrapper = new UserDbWrapper();
        this._producerClient = new Producer();
    }

    // Add new user to DB, publish user added event, and send created response
    public AddUser = async (req: express.Request, res: express.Response) => {
        let user = req.body as User
        console.log('[ * ] Adding user, ', user.userName);
        let _data:User;
        let _existingUser = await this._userDbWrapper.GetUser(user.userName)
        
        if(_existingUser) {
            console.log('[ * ] User, ', user.userName, ' already exists, sending error response');
            res.sendStatus(422);
        } else {
            return this._userDbWrapper.AddUser(user)
                .then((user: User) => {
                    _data = Object.assign({}, user);
                    console.log('[ * ] New user, ', user.userName, ' added');
                    let userAddedEvent = new UserAddedEvent(user.userName)
                    return this._producerClient.Publish(userAddedEvent); // Publish user added event to message queue
                })
                .then((ok) => {
                    delete _data.password;
                    return res.status(201).json(_data);
                })
        }
    }

    // Delete user from DB, publish user deleted event, and send deleted response
    public DeleteUser = (req: express.Request, res: express.Response) => {
        let _userName:string = req.params['userName']
        console.log('[ * ] deleting user ', _userName);
        let _token = req.headers?.authorization?.split(' ')[1];

        if(_token) {
            let _decodedUserName = jwt.decode(_token, {json: true});
            if(_userName !== _decodedUserName?.userName) { 
                console.log('[ * ] anauthorized request ');
                res.sendStatus(401);
            }
        }
        return this._userDbWrapper.DeleteUser(_userName)
            .then((ok: boolean) => {
                if(ok) {
                    console.log('[ * ] user, ', _userName, ' deleted');
                    let userDeletedEvent = new UserDeletedEvent(_userName);
                    this._producerClient.Publish(userDeletedEvent); // Publish user deleted event to message queue
                }
                return;
            })
            .then(() => {
                return res.sendStatus(204);
            })
        // let consumer = new Consumer();
        // return consumer.Consume((msg: any) => {
        //     console.log('[ * ] message received in consumer, ', msg.content.toString());
        //     return true;
        // })
        // .then((ok) => {
        //     console.log('[ * ] message handled in consumer, sending response');
        //     return res.sendStatus(200);
        // })
    }

    public VerifyCredentials = async (req: express.Request, res: express.Response) => {
        let userAuth = req.body as UserAuth;
        console.log('[ * ] verifying credentials for user ', userAuth.userName)
        let _user = await this._userDbWrapper.GetUser(userAuth.userName);
        if(_user) {
            bcrypt.compare(userAuth.password, _user.password)
                .then(result => {
                    if(result === true) { 
                        console.log('[ * ] valid credentials for ', userAuth.userName)
                        let token = jwt.sign({userName: _user?.userName, role: _user?.role}, constants.JWT_SECRET_KEY);
                        return res.json({token: token});
                    }
                    console.log('[ * ] invalid credentials for ', userAuth.userName)
                    res.sendStatus(404);
                })
        } else {
            console.log('[ * ] invalid credentials for ', userAuth.userName)
            return res.sendStatus(404);
        }
    }
}