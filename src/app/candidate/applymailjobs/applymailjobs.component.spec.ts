import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplymailjobsComponent } from './applymailjobs.component';

describe('ApplymailjobsComponent', () => {
  let component: ApplymailjobsComponent;
  let fixture: ComponentFixture<ApplymailjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplymailjobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplymailjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
