import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './containers/workout/workout.component';
import {RouterModule, Routes} from "@angular/router";
import {CreateEditWorkoutComponent} from "./containers/create-edit-workout/create-edit-workout.component";
import {ReactiveFormsModule} from "@angular/forms";
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';
import {SharedModule} from "../shared/shared.module";

export const ROUTES:Routes = [
  { path: '', component: WorkoutComponent },
  { path: 'new', component: CreateEditWorkoutComponent },
  { path: ':id', component: CreateEditWorkoutComponent }
];
@NgModule({
  declarations: [
    WorkoutComponent,
    CreateEditWorkoutComponent,
    WorkoutTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class WorkoutModule { }
