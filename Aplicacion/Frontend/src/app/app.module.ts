import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MasterURlService} from "./services/master-url.service";
import { HomeComponent } from './home/home.component';
import {routing} from "./app.routes";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
      MasterURlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
