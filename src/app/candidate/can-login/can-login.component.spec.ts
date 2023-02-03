import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanLoginComponent } from './can-login.component';

describe('CanLoginComponent', () => {
  let component: CanLoginComponent;
  let fixture: ComponentFixture<CanLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
