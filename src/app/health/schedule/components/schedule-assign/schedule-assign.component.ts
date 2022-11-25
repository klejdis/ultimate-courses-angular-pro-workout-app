import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Store} from "../../../../app/store/store";
import {Meal} from "../../../shared/services/meals/meals.service";
import {Workout} from "../../../shared/services/workouts/workout.service";

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleAssignComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  selectedSection: any;

// {
//   type: string,
//   assigned: string[],
//   scheduleItem: ScheduleItem,
//   day: Date,
//   mealtime: string
// }

  @Input()
  list: (Meal| Workout)[] | null;

  @Output()
  updateSection = new EventEmitter();

  @ViewChild('assignModal')
  assignModalRef:any;

  selected: string[] = [];

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['selectedSection'].currentValue !== undefined){
      this.assignModalRef.show();
    }

    if (this.selectedSection?.assigned){
      this.selected =  [...this.selectedSection?.assigned];
    }
  }

  exists(name: string){
    return !!~this.selected.indexOf(name);
  }

  updateAssign(){
    this.updateSection.emit({
      [this.selectedSection.type] : this.selected
    });

    this.assignModalRef.hide()
  }

  toggleItem(name: string){
    if(this.exists(name)){
      this.selected = this.selected.filter(item => item !== name)
    }else {
      this.selected = [...this.selected, name]
    }
  }

}
