import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/Classes/User';
import { DataService } from '../data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  user:User;
  constructor(private dataService: DataService) {         
    this.user = new User();
  }

  ngOnInit(): void {
  }
  
  save(userForm: NgForm) {
    let u :User = (userForm.value);
    this.dataService.saveUser(u)
    // console.log();
}

}
