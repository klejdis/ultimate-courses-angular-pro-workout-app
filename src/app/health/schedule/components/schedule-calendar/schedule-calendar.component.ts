import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ScheduleItem, ScheduleList} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  selectedDate: Date;

  @Input()
  set date(date: Date | null){
    if (date){
      this.selectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
    }
  };

  @Input()
  scheduleList: ScheduleList;

  @Output()
  onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  sectionSelected: EventEmitter<{type: string, assigned: string[] | undefined, scheduleItem: ScheduleItem | null, day: Date, mealtime: string }>
    = new EventEmitter();

  sections = [
    {key: 'morning', name: 'Morning' },
    {key: 'lunch', name: 'Lunch' },
    {key: 'evening', name: 'Evening' },
    {key: 'snacks', name: 'Snacks' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getSection(name: string): ScheduleItem | null{
    return this.scheduleList != undefined && this.scheduleList[name] || null;
 }

  onDateChangeListener(event: Date) {
    this.onDateChange.emit(event);
  }

  onSelectSection($event: {type: string, assigned: string[] | undefined, scheduleItem: ScheduleItem | null}, mealtime: string) {

    console.log($event)

    this.sectionSelected.emit({
      ...$event,
      mealtime,
      day: this.selectedDate
    })

  }
}
