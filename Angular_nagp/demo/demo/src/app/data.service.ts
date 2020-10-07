import { Injectable } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../Classes/User';
import data from './data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUsers(): User[] {
    let users: User[];
    users = data;
    return users;
  }

  saveUser(user:User):void{
    data.push(user);
  }

}
