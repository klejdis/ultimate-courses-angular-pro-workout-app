import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditWorkoutComponent } from './create-edit-workout.component';

describe('CreateEditWorkoutComponent', () => {
  let component: CreateEditWorkoutComponent;
  let fixture: ComponentFixture<CreateEditWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditWorkoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
