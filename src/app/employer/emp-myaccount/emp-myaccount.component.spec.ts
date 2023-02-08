import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMyaccountComponent } from './emp-myaccount.component';

describe('EmpMyaccountComponent', () => {
  let component: EmpMyaccountComponent;
  let fixture: ComponentFixture<EmpMyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMyaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
