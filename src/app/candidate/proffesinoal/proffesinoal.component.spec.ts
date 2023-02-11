import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffesinoalComponent } from './proffesinoal.component';

describe('ProffesinoalComponent', () => {
  let component: ProffesinoalComponent;
  let fixture: ComponentFixture<ProffesinoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProffesinoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProffesinoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
