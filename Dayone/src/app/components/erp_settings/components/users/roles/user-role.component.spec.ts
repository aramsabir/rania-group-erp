import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyRoleComponent } from './user-role.component';

describe('UserCompanyRoleComponent', () => {
  let component: UserCompanyRoleComponent;
  let fixture: ComponentFixture<UserCompanyRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCompanyRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
