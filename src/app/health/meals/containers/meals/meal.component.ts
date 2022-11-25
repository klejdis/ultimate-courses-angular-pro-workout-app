import { Component, OnInit } from '@angular/core';
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Store} from "../../../../app/store/store";

@Component({
  selector: 'app-meals',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  meals$ = this.store.select<Meal[]>('meals');
  subscription = this.mealsService.getMeals().subscribe();

  constructor(
    private mealsService: MealsService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  deleteItem(meal: Meal) {
    this.mealsService.deleteMeal(meal)
  }
}
