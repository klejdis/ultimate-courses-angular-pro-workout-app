import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MealsService} from "../../../shared/services/meals/meals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Workout, WorkoutService} from "../../../shared/services/workouts/workout.service";
import {Observable, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-create-edit-workout',
  templateUrl: './create-edit-workout.component.html',
  styleUrls: ['./create-edit-workout.component.scss']
})
export class CreateEditWorkoutComponent implements OnInit {

  subscription: Subscription | undefined = this.workoutService.fetchWorkouts().subscribe();
  workout$: Observable<Workout | undefined> = this.workoutService.readWorkout(this.route.snapshot.params['id']);

  editMode:boolean = false;

  loading:boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    type: ['strength'],
    strength: this.fb.group({
      reps:0,
      sets:0,
      weight:0,
    }),
    endurance: this.fb.group({
      distance:0,
      duration:0,
    })
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.workout$.subscribe(workout => {
      if(workout){
        this.form.patchValue({...workout});
        this.editMode = true;
      }

      this.loading = false;
    })
  }

  get nameRequired(){
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  async submit() {
    if (this.form.valid) {
     await this.workoutService.createWorkout(this.form.value as Workout);
     this.router.navigate(['workouts'])
    }
  }

  async update() {
    if (this.form.valid) {
      await this.workoutService
        .updateWorkout(this.route.snapshot.params['id'], this.form.value as Workout);
      this.router.navigate(['workouts'])
    }
  }
}
