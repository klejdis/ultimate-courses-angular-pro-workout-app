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
import {ScheduleService} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent implements OnInit, OnChanges {

  @Input()
  date: Date;

  @Output()
  onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  decreaseOffset() {
    this.onDateChange.emit(
      this.addWeeksToDate(this.date, -1)
    );
  }

  increaseOffset() {
    this.onDateChange.emit(
      this.addWeeksToDate(this.date, 1)
    );
  }

  addWeeksToDate(dateObj:Date ,numberOfWeeks: number){
    //get start of week
    dateObj = this.scheduleService.getStartOfWeek(dateObj);

    dateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
    return dateObj;
  }
}
