import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {User} from '../../Classes/User';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  users :User[];
  pageTitle: string = "Demo app";

  constructor(private dataService : DataService) { 
    this.users = [];
  }

  ngOnInit(): void {
    this.users = this.dataService.getUsers();
    console.log(this.users)
  }

}
