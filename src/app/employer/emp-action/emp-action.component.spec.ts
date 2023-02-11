import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpActionComponent } from './emp-action.component';

describe('EmpActionComponent', () => {
  let component: EmpActionComponent;
  let fixture: ComponentFixture<EmpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
