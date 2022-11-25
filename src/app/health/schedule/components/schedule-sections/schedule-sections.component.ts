import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScheduleItem} from "../../../shared/services/schedule/schedule.service";
import {Meal} from "../../../shared/services/meals/meals.service";
import {Workout} from "../../../shared/services/workouts/workout.service";

@Component({
  selector: 'app-schedule-sections',
  templateUrl: './schedule-sections.component.html',
  styleUrls: ['./schedule-sections.component.scss']
})
export class ScheduleSectionsComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  scheduleItem: ScheduleItem | null;

  @Output()
  sectionSelected:EventEmitter<{type: string, assigned: string[] | undefined, scheduleItem:ScheduleItem | null}> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(type: 'workouts' | 'meals', assigned: string[] | undefined = []) {
    const scheduleItem =  this.scheduleItem;


    this.sectionSelected.emit({
      type,
      assigned,
      scheduleItem
    })

  }
}
