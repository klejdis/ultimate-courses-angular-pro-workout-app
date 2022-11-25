import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSectionsComponent } from './schedule-sections.component';

describe('ScheduleSectionsComponent', () => {
  let component: ScheduleSectionsComponent;
  let fixture: ComponentFixture<ScheduleSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
