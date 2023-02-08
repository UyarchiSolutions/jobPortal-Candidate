import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAppliesListComponent } from './emp-applies-list.component';

describe('EmpAppliesListComponent', () => {
  let component: EmpAppliesListComponent;
  let fixture: ComponentFixture<EmpAppliesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpAppliesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAppliesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
