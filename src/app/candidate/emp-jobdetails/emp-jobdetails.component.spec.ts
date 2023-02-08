import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpJobdetailsComponent } from './emp-jobdetails.component';

describe('EmpJobdetailsComponent', () => {
  let component: EmpJobdetailsComponent;
  let fixture: ComponentFixture<EmpJobdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpJobdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpJobdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
