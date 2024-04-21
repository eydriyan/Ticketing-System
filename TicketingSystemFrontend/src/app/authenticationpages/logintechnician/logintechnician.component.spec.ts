import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintechnicianComponent } from './logintechnician.component';

describe('LogintechnicianComponent', () => {
  let component: LogintechnicianComponent;
  let fixture: ComponentFixture<LogintechnicianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogintechnicianComponent]
    });
    fixture = TestBed.createComponent(LogintechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
