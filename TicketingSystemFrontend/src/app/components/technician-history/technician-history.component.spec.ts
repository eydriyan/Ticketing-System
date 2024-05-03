import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianHistoryComponent } from './technician-history.component';

describe('TechnicianHistoryComponent', () => {
  let component: TechnicianHistoryComponent;
  let fixture: ComponentFixture<TechnicianHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianHistoryComponent]
    });
    fixture = TestBed.createComponent(TechnicianHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
