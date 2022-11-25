import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import {RouterModule, Routes} from "@angular/router";
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleSectionsComponent } from './components/schedule-sections/schedule-sections.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';
import {ModalModule} from "ngx-bootstrap/modal";

export const ROUTES:Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent,
    ScheduleSectionsComponent,
    ScheduleAssignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ModalModule,
  ]
})
export class ScheduleModule { }
