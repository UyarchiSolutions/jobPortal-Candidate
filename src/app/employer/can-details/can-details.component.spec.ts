import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDetailsComponent } from './can-details.component';

describe('CanDetailsComponent', () => {
  let component: CanDetailsComponent;
  let fixture: ComponentFixture<CanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
