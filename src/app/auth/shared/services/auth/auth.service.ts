import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Store} from "../../../../app/store/store";
import {tap} from "rxjs";
import {UserInterface} from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$ = this.af.authState.pipe(
    tap( (next) => {

      if (!next){
        this.store.set('user', null)
        return;
      }

      const user:UserInterface = {
        email: next.email,
        uuid: next.uid,
        authenticated: true
      }

      this.store.set('user', user)

    })
  )

  constructor(
    private af:AngularFireAuth,
    private store: Store
) { }

  createUser(email:string, password:string){
    return this.af.createUserWithEmailAndPassword(email,password)
  }

  login(email:string, password:string){
      return this.af.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.af.signOut();
  }

  get authState(){
    return this.af.authState;
  }

  async user() {
    return await this.af.currentUser;
  }
}
