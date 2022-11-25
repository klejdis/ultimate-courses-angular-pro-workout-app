import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MealsService} from "./services/meals/meals.service";
import { ListItemComponent } from './components/list-item/list-item.component';
import {WorkoutService} from "./services/workouts/workout.service";
import {ScheduleService} from "./services/schedule/schedule.service";



@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ListItemComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any>{
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutService,
        ScheduleService
      ]
    }
  }
}
