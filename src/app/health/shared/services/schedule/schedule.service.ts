import { Injectable } from '@angular/core';
import {Store} from "../../../../app/store/store";
import {BehaviorSubject, first, map, Observable, Subject, switchMap, tap, withLatestFrom} from "rxjs";
import {Meal} from "../meals/meals.service";
import {Workout} from "../workouts/workout.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {UserInterface} from "../../../../auth/shared/services/auth/user.interface";
import {SnapshotAction} from "@angular/fire/compat/database/interfaces";

export interface ScheduleItem{
  meals: string[] | undefined,
  workouts: string[] | undefined,
  section: string,
  timestamp: number,
  $key?: string | undefined | null
}

export interface ScheduleList{
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key:string]: any
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  user: UserInterface | undefined;

  //init with the today's date
  private date$ = new BehaviorSubject(this.getStartOfWeek(new Date()));

  schedule$: Observable<any>  = this.date$.pipe(
    tap(next => {
      this.store.set('date', next);
    }),
    map((day: Date) => {
      const startAt = (
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate()
        )
      ).getTime();

      const endAt = (
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        )
      ).getTime() - 1;

      return { startAt, endAt }
    }),
    switchMap(( {startAt, endAt}) => {
      //return a new observable with schedule items fetch from db
      return this.getSchedule(startAt, endAt).snapshotChanges()
    }),
    map( (items:SnapshotAction<ScheduleItem>[]) => {
      const mapped: ScheduleList = {};

      for (const prop of items){
        const item = {...prop.payload.val(), $key: prop.key};

        // @ts-ignore
        if(item && !mapped[item?.section]){
          // @ts-ignore
          mapped[item.section] = item;
        }
      }

      return mapped;
    }),
    tap(next => this.store.set('schedule', next))
  );

  private section$ = new Subject();

  list$ = this.section$.pipe(
    map((value:any)=> {
     return  this.store.value[value.type];
    } ),
    tap(next => this.store.set('list', next))
  )

  selectedSection$ = this.section$.pipe(
    tap(next => this.store.set('selectedSection', next))
  )

  selectedItems$ = new Subject();

  items$ = this.selectedItems$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]:any[]) => {
      const id = section?.scheduleItem?.$key;

      const defaults: ScheduleItem = {
        meals: [] ,
        workouts: [],
        section: section.mealtime,
        timestamp: new Date(section.day).getTime()
      }

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id){
        return this.updateSection(id, payload)
      }else {
        return this.createSection(id, payload)
      }

    })
  );




  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService

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

  updateDate(date:Date){
    this.date$.next(date);
  }

  getStartOfWeek(d: Date){
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private getSchedule(startAt: number, endAt: number):AngularFireList<ScheduleItem> {
    return this.db.list('schedule/'+this.user?.uuid,
        ref => ref.orderByChild('timestamp')
          .startAt(startAt)
          .endAt(endAt));
  }

  updateSelectedSection(
    event: {type: string, assigned: string[] | undefined, scheduleItem: ScheduleItem | null, day: Date, mealtime: string }
  ){
    this.section$.next(event);
  }

  updateSchedule(selected: string[]) {
    this.selectedItems$.next(selected);
  }


  private updateSection(id: any, payload: any) {
    this.db.object('/schedule/'+this.user?.uuid+'/'+id).update(payload);
  }

  private createSection(id: any, payload: any) {
    this.db.list('/schedule/'+this.user?.uuid).push(payload);
  }
}
