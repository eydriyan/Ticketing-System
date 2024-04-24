import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhistoryComponent } from './adminhistory.component';

describe('AdminhistoryComponent', () => {
  let component: AdminhistoryComponent;
  let fixture: ComponentFixture<AdminhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminhistoryComponent]
    });
    fixture = TestBed.createComponent(AdminhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
