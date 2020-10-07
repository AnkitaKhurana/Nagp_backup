import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './shared/modules/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatesComponent } from './components/states/states.component';
import { DistrictsComponent } from './components/districts/districts.component';
import { NewsComponent } from './components/news/news.component';
import { PrecautionsComponent } from './components/precautions/precautions.component';
import { TabComponent } from './shared/components/tab/tab.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { MemoryService } from './shared/services/memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    StatesComponent,
    DistrictsComponent,
    NewsComponent,
    PrecautionsComponent,
    TabComponent,
    AdminComponent,
    LoginComponent,
    AddNewsComponent,
    NewsCardComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MemoryService, { passThruUnknownUrl: true }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
