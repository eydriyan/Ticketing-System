import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewHistoryComponent } from './userview-history.component';

describe('UserviewHistoryComponent', () => {
  let component: UserviewHistoryComponent;
  let fixture: ComponentFixture<UserviewHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserviewHistoryComponent]
    });
    fixture = TestBed.createComponent(UserviewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
