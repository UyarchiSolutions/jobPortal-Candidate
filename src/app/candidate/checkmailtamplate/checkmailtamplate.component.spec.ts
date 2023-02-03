import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmailtamplateComponent } from './checkmailtamplate.component';

describe('CheckmailtamplateComponent', () => {
  let component: CheckmailtamplateComponent;
  let fixture: ComponentFixture<CheckmailtamplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckmailtamplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmailtamplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
