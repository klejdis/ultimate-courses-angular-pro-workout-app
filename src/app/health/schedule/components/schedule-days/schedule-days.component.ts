import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange, SimpleChanges
} from '@angular/core';
import {ScheduleService} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
})
export class ScheduleDaysComponent implements OnInit, OnChanges {

  @Input()
  date: Date;

  @Output()
  onDateChange: EventEmitter<Date> = new EventEmitter();

  daysOfWeekArray: Date[];

  daysArray = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];


  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.daysOfWeekArray = this.setDaysOfWeekArray();
  }

  //generate the 7 days of week and store it on daysOfWeekArray prop
  setDaysOfWeekArray(): Date[] {
    let dates: Date[] = [];

    for (let i=0; i<7; i++){
      let date = new Date(
        this.date.getTime()
      );

      date = this.scheduleService.getStartOfWeek(date);

      date.setDate(date.getDate() + i);

      dates.push(
        date
      )
    }

    return dates;
  }

  onDateChangeListener(day: Date) {
    this.onDateChange.emit(day);
  }
}
