import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminanalyticsComponent } from './adminanalytics.component';

describe('AdminanalyticsComponent', () => {
  let component: AdminanalyticsComponent;
  let fixture: ComponentFixture<AdminanalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminanalyticsComponent]
    });
    fixture = TestBed.createComponent(AdminanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
