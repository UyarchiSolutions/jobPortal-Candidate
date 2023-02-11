import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMailTemplateComponent } from './emp-mail-template.component';

describe('EmpMailTemplateComponent', () => {
  let component: EmpMailTemplateComponent;
  let fixture: ComponentFixture<EmpMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
