import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR]
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value: string | undefined;

  private onTouch: Function | undefined;
  private onModelChange: Function | undefined;


  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setSelected(selected: string) {
    this.value = selected;
    // @ts-ignore
    this.onModelChange(selected);
    // @ts-ignore
    this.onTouch();
  }
}
