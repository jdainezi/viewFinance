import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    ModalModule.forRoot()
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
