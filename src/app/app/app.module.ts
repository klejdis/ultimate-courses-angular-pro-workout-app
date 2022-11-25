import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './containers/app/app-routing.module';
import { AppComponent } from './containers/app/app.component';

import {AuthModule} from "../auth/auth.module";
import {Store} from "./store/store";
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import {HealthModule} from "../health/health.module";
import {RouterModule, Routes} from "@angular/router";
import { LoaderComponent } from './components/loader/loader.component';
import {ModalModule} from "ngx-bootstrap/modal";

const ROUTES:Routes = [
  { path:'', pathMatch:"full",  redirectTo: 'schedule'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    HealthModule
  ],
  providers: [Store],
  exports: [
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
