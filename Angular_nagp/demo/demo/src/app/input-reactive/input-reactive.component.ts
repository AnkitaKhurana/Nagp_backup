import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../../Classes/User';
import { DataService } from '../data.service';

@Component({
  selector: 'app-input-reactive',
  templateUrl: './input-reactive.component.html',
  styleUrls: ['./input-reactive.component.css']
})
export class InputReactiveComponent implements OnInit {
  user: User = new User();
  userForm: FormGroup;
  pageTitle: string = "Reactive form";
  constructor(public fb: FormBuilder, private dataService : DataService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(1)]],
      id: ["", Validators.required],
      email: ["", Validators.required]
  });
  }

  save(){
    if(typeof this.userForm.controls['id'] !== 'number')
      this.userForm.controls['id'].setValue(7);
    // let u :User = (this.userForm.value);

    this.dataService.saveUser(this.userForm.value);
  }
}
