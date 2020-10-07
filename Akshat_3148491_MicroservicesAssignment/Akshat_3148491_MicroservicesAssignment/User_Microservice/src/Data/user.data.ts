import fs from "fs";
import bcrypt from "bcrypt";
import { User } from "../Models/user.model";
import { UserList } from "../Models/userlist.model";

export class UserDbWrapper {
    private _userList: UserList;

    // Read seed data from data file, and store in in-memory list for further use.
    constructor() {
        let fileData = fs.readFileSync('src/Data/UserData.json');
        this._userList = JSON.parse(fileData.toString()) as UserList;
    }

    // Returns the user information object based on passed parameter.
    public GetUser = async (userName: string) => {
        return this._userList.userList.find((user: User) => {
            return user.userName === userName;
        })
    }

    public AddUser = async (user: User) => {
        return bcrypt.hash(user.password, 5)
            .then((password: string) => {
                user.password = password;
                this._userList.userList.push(user);
                return user;
            })
    }

    public DeleteUser = async (userName: string) => {
        let userIndex = this._userList.userList.findIndex((user: User) => {
            return user.userName === userName;
        });
        if(userIndex !== -1) {
            this._userList.userList.splice(userIndex, 1);
            return true;
        }
        return false;
    }
}