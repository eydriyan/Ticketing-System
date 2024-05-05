import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianprofileComponent } from './technicianprofile.component';

describe('TechnicianprofileComponent', () => {
  let component: TechnicianprofileComponent;
  let fixture: ComponentFixture<TechnicianprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianprofileComponent]
    });
    fixture = TestBed.createComponent(TechnicianprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
