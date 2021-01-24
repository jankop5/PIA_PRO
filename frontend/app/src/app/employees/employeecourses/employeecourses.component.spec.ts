import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecoursesComponent } from './employeecourses.component';

describe('EmployeecoursesComponent', () => {
  let component: EmployeecoursesComponent;
  let fixture: ComponentFixture<EmployeecoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeecoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeecoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
