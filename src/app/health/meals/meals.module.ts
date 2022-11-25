import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MealComponent} from "./containers/meals/meal.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CreateMealComponent} from "./containers/create-meal/create-meal.component";
import {ReactiveFormsModule} from "@angular/forms";
import { EditMealComponent } from './containers/edit-meal/edit-meal.component';

export const ROUTES:Routes = [
  { path: '', component: MealComponent },
  { path: 'new', component: CreateMealComponent },
  { path: ':id', component: EditMealComponent },
];

@NgModule({
  declarations: [
    MealComponent,
    CreateMealComponent,
    EditMealComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MealsModule { }
