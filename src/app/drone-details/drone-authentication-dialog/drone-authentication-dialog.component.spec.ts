import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneAuthenticationDialogComponent } from './drone-authentication-dialog.component';

describe('DroneAuthenticationDialogComponent', () => {
  let component: DroneAuthenticationDialogComponent;
  let fixture: ComponentFixture<DroneAuthenticationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DroneAuthenticationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneAuthenticationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
