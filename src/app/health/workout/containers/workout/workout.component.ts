import { Component, OnInit } from '@angular/core';
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Store} from "../../../../app/store/store";
import {Workout, WorkoutService} from "../../../shared/services/workouts/workout.service";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  workouts$ = this.store.select<Workout[]>('workouts');
  subscription = this.workoutsService.fetchWorkouts().subscribe();

  constructor(
    private workoutsService: WorkoutService,
    private store: Store
  ) { }


  ngOnInit(): void {


  }

  async remove(workout: Workout){
    this.workoutsService.deleteWorkout(workout);
  }

}
