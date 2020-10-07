import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostModule} from './post/post.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {MemoryService} from './memory.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MemoryService, { passThruUnknownUrl: true, dataEncapsulation: false  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
