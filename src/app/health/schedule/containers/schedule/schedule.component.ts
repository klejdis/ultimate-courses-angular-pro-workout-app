import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ScheduleItem, ScheduleService} from "../../../shared/services/schedule/schedule.service";
import {Store} from "../../../../app/store/store";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Workout, WorkoutService} from "../../../shared/services/workouts/workout.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  //to initiate observables
  subscriptions: Subscription[];

  date$: Observable<Date> =  this.store.select('date');

  schedule$: Observable<any> = this.store.select('schedule');

  selectedSection$ = this.store.select('selectedSection');

  list$: Observable<Meal[] | Workout[]>  = this.store.select<Meal[] | Workout[]>('list');

  constructor(
    private scheduleService: ScheduleService,
    private store:Store,
    private mealsService: MealsService,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selectedSection$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.getMeals().subscribe(),
      this.workoutService.fetchWorkouts().subscribe(),
      this.scheduleService.items$.subscribe()
    ];

  }

  ngOnDestroy() {
    this.subscriptions?.forEach(sub => {
      sub.unsubscribe();
    })
  }

  onDateChangeListener(event: Date) {
    this.scheduleService.updateDate(event);
  }

  onSectionSelected(event:{type: string, assigned: string[] | undefined, scheduleItem: ScheduleItem | null, day: Date, mealtime: string } ) {
    this.scheduleService.updateSelectedSection(event);
  }

  onUpdateSection(event: any) {
    this.scheduleService.updateSchedule(event);
  }
}
