import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.scss']
})
export class EditMealComponent implements OnInit, OnDestroy {

  meal$: Observable<Meal | undefined> | undefined;

  subscription = this.mealsService.getMeals().subscribe();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mealsService: MealsService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.meal$ = this.mealsService.getMeal(params['id']);
    });

    this.meal$?.subscribe(meal => {

      if (meal){
        this.form.patchValue({name: meal.name});

        while (this.ingredients.length){
          this.ingredients.removeAt(0)
        }

        for (const item of meal.ingredients){
          this.ingredients.push(new FormControl(item))
        }
      }

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  submitEditMeal() {
    const key = this.route.snapshot.params['id'];
    this.mealsService.updateMeal(key, this.form.value as Meal);
    this.router.navigate(['/meals']);
  }

  get ingredients(){
    return this.form.get('ingredients') as FormArray;
  }

  get nameRequired(){
    return this.form.get('name')?.hasError('required') && this.form.get('name')?.touched;
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }



}
