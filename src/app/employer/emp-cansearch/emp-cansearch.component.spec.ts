import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCansearchComponent } from './emp-cansearch.component';

describe('EmpCansearchComponent', () => {
  let component: EmpCansearchComponent;
  let fixture: ComponentFixture<EmpCansearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCansearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCansearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
