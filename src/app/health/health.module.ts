import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealsModule} from "./meals/meals.module";
import {RouterModule, Routes} from "@angular/router";
import {ScheduleModule} from "./schedule/schedule.module";
import {WorkoutModule} from "./workout/workout.module";
import {AuthGuard} from "../auth/shared/guards/auth.guard";
import {SharedModule} from "./shared/shared.module";

export const ROUTES:Routes = [
  { path: 'meals',  canActivate: [AuthGuard] ,loadChildren: () =>  MealsModule },
  { path: 'schedule', canActivate: [AuthGuard] ,loadChildren: () =>  ScheduleModule },
  { path: 'workouts', canActivate: [AuthGuard] ,loadChildren: () =>  WorkoutModule },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule { }
