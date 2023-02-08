import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpUpdateProfileComponent } from './emp-update-profile.component';

describe('EmpUpdateProfileComponent', () => {
  let component: EmpUpdateProfileComponent;
  let fixture: ComponentFixture<EmpUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpUpdateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
