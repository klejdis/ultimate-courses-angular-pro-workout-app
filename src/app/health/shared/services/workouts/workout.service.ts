import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

import {Store} from "../../../../app/store/store";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {BaseService} from "../base/base.service";
import {filter, map, Observable, of, tap} from "rxjs";


export interface Workout{
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService extends BaseService{

  constructor(
    protected override store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    super(store);
  }

  fetchWorkouts(): Observable<any>{
    return this.db.list<Workout>('workouts/'+ this.user?.uuid).snapshotChanges().pipe(
      tap(val => {
        let workouts:any = [];

        val.forEach( v =>  {
          workouts.push({ ...v.payload.val(), $key: v.key });
        });

        this.store.set('workouts', workouts);
      })
    );
  }

  createWorkout(workout: Workout){
    return this.db.list('workouts/'+this.user?.uuid).push(workout);
  }

  readWorkout(key: string): Observable<Workout | undefined>{
    if (!key) return of(undefined);

    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map(item => item.find(item => {
        return item.$key === key
      } ))
    )
  }

  updateWorkout(key: string, workout: Workout){
    return this.db.object('workouts/'+this.user?.uuid + '/' + key).update(workout);
  }

  deleteWorkout(workout: Workout){
    return this.db.list('workouts/'+this.user?.uuid).remove(workout.$key)
  }


}
