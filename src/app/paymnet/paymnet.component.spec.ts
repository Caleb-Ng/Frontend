import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymnetComponent } from './paymnet.component';

describe('PaymnetComponent', () => {
  let component: PaymnetComponent;
  let fixture: ComponentFixture<PaymnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
