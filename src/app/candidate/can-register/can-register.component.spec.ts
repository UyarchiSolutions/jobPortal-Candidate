import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanRegisterComponent } from './can-register.component';

describe('CanRegisterComponent', () => {
  let component: CanRegisterComponent;
  let fixture: ComponentFixture<CanRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
