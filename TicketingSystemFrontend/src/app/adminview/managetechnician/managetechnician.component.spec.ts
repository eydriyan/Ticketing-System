import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetechnicianComponent } from './managetechnician.component';

describe('ManagetechnicianComponent', () => {
  let component: ManagetechnicianComponent;
  let fixture: ComponentFixture<ManagetechnicianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagetechnicianComponent]
    });
    fixture = TestBed.createComponent(ManagetechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
