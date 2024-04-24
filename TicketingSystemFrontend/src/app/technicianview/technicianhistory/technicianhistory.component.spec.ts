import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianhistoryComponent } from './technicianhistory.component';

describe('TechnicianhistoryComponent', () => {
  let component: TechnicianhistoryComponent;
  let fixture: ComponentFixture<TechnicianhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianhistoryComponent]
    });
    fixture = TestBed.createComponent(TechnicianhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
