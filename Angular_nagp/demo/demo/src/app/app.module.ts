import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import {UsernamePipe} from '../app/displayName';
import { InputComponent } from './input/input.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { InputReactiveComponent } from './input-reactive/input-reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    UsernamePipe,
    InputComponent,
    InputReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
