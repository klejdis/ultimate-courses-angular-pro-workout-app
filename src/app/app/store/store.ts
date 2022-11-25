import {BehaviorSubject, distinctUntilChanged} from 'rxjs';
import {Observable} from "rxjs";
import {pluck} from "rxjs";
import {UserInterface} from "../../auth/shared/services/auth/user.interface";
import {Meal} from "../../health/shared/services/meals/meals.service";
import {Workout} from "../../health/shared/services/workouts/workout.service";
import {ScheduleItem} from "../../health/shared/services/schedule/schedule.service";

export interface State {
  user: UserInterface | undefined,
  meals: Meal[],
  workouts: Workout[] | undefined,
  schedule: ScheduleItem[] | undefined,
  selectedSection: any | undefined,
  list: any | undefined,
  [key: string]: any,
  date: Date | undefined
}

const state: State = {
  user: undefined,
  meals: [],
  workouts: undefined,
  schedule: undefined,
  selectedSection: undefined,
  list: undefined,
  date: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
