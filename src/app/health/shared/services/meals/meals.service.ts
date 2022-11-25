import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

import {Store} from "../../../../app/store/store";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {first, firstValueFrom, Observable, take, tap, of, filter, map} from "rxjs";
import {UserInterface} from "../../../../auth/shared/services/auth/user.interface";


export interface Meal{
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  user: UserInterface | undefined;

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {

    this.setUser();
  }

   setUser(){
    const user = this.store.select<UserInterface>('user')
      .pipe(first())
      .subscribe(x => {
        this.user = x;
      })
   }

  getMeal(key: string): Observable<Meal | undefined>{
    if (!key) return of(undefined);

    return this.store.select<Meal[]>('meals').pipe(
      filter(Boolean),
      map(meals => meals.find(meal => {
        return meal.$key === key
      } ))
    )
  }

  getMeals(){
    return this.db.list<Meal>('meals/'+ this.user?.uuid).snapshotChanges().pipe(
      tap(val => {
        let meals:any = [];

        val.forEach( v =>  {
          meals.push({ ...v.payload.val(), $key: v.key });
        });

        this.store.set('meals', meals);
      })
    );
  }

  saveMeal(meal: Meal){
    return this.db.list('meals/'+this.user?.uuid).push(meal);
  }

  updateMeal(key: string, meal: Meal){
    return this.db.object('meals/'+this.user?.uuid + '/' + key).update(meal);
  }

  deleteMeal(meal: Meal){
    return this.db.list('meals/'+this.user?.uuid).remove(meal.$key)
  }


}
