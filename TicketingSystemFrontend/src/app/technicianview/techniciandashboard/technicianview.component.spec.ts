import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianviewComponent } from './technicianview.component';

describe('TechnicianviewComponent', () => {
  let component: TechnicianviewComponent;
  let fixture: ComponentFixture<TechnicianviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianviewComponent]
    });
    fixture = TestBed.createComponent(TechnicianviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
