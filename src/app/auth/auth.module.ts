import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";

import {FirebaseApp} from "@angular/fire/app";
import {AngularFireModule } from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {SharedModule} from "./shared/shared.module";
import {AuthGuard} from "@angular/fire/auth-guard";

export const ROUTES:Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: "full", redirectTo: 'login'},
      {path: 'login', loadChildren: () =>  LoginModule},
      {path: 'register', loadChildren: () =>  RegisterModule}
    ]
  }
];

export const firebaseconfig = {
  apiKey: "AIzaSyBzznIFd74M2G71sZCt9u3Z7pkhbgggp6E",
  authDomain: "workout-e9c75.firebaseapp.com",
  databaseURL: "https://workout-e9c75-default-rtdb.firebaseio.com",
  projectId: "workout-e9c75",
  storageBucket: "workout-e9c75.appspot.com",
  messagingSenderId: "627136337591",
  appId: "1:627136337591:web:84f7b28ed7d21801aa1f32"
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
  providers:[
    AuthGuard
  ]
})
export class AuthModule { }
