import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.authState.pipe(
      map( user => {

       if (!user){
         return this.router.navigate(['auth/login'])
       }

       return !!user
      })
    ) as Observable<boolean | UrlTree>;
  }

}
