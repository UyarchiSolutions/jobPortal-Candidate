import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobpostComponent } from './emp-jobpost.component';

describe('EmpJobpostComponent', () => {
  let component: EmpJobpostComponent;
  let fixture: ComponentFixture<EmpJobpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpJobpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpJobpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
