import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendotpforgotComponent } from './sendotpforgot.component';

describe('SendotpforgotComponent', () => {
  let component: SendotpforgotComponent;
  let fixture: ComponentFixture<SendotpforgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendotpforgotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendotpforgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
