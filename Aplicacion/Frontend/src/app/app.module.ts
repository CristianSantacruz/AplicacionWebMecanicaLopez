import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MasterURlService} from "./services/master-url.service";
import { HomeComponent } from './home/home.component';
import {routing} from "./app.routes";
import { LoginComponent } from './login/login.component';
import { ReservasComponent } from './reservas/reservas.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ReservasComponent
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
