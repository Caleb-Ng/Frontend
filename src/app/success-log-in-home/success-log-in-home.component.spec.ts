import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLogInHomeComponent } from './success-log-in-home.component';

describe('SuccessLogInHomeComponent', () => {
  let component: SuccessLogInHomeComponent;
  let fixture: ComponentFixture<SuccessLogInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessLogInHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessLogInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
