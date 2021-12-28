import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDroneComponent } from './create-drone.component';

describe('CreateDroneComponent', () => {
  let component: CreateDroneComponent;
  let fixture: ComponentFixture<CreateDroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDroneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
