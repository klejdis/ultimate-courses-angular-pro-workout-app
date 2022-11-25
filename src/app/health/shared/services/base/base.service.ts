import {UserInterface} from "../../../../auth/shared/services/auth/user.interface";
import {filter, first} from "rxjs";
import {Store} from "../../../../app/store/store";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

export class BaseService {

  user: UserInterface | undefined;

  constructor(
    protected store: Store
  ) {
    this.setUser();
  }

  setUser(){
    const user = this.store.select<UserInterface>('user')
      .pipe(filter(Boolean))
      .subscribe(x => {
        this.user = x;
      })
  }
}
