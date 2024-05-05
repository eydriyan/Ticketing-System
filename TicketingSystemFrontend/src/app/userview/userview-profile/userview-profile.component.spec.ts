import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewProfileComponent } from './userview-profile.component';

describe('UserviewProfileComponent', () => {
  let component: UserviewProfileComponent;
  let fixture: ComponentFixture<UserviewProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserviewProfileComponent]
    });
    fixture = TestBed.createComponent(UserviewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
