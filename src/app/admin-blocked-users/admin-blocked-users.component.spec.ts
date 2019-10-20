import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlockedUsersComponent } from './admin-blocked-users.component';

describe('AdminBlockedUsersComponent', () => {
  let component: AdminBlockedUsersComponent;
  let fixture: ComponentFixture<AdminBlockedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlockedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
