import { IUser } from 'src/Interfaces/IUser';
import { Output } from '@angular/core';

export class User implements IUser{

    id: number;
    name : string ;
    email: string;
    age : number;

    constructor(){
        this.id = 0 ;
        this.name = 'default';
        this.email = 'default';
        this.age = 0;
    }

}