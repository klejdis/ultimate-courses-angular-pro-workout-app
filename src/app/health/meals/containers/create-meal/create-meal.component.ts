import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-meals',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder,
    private mealsService: MealsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async submitCreateMeal() {
    if (this.form.valid){
      await this.mealsService.saveMeal(this.form.value as Meal);
      this.router.navigate(['/meals']);
    }
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
