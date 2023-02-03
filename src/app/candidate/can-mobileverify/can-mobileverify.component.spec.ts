import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanMobileverifyComponent } from './can-mobileverify.component';

describe('CanMobileverifyComponent', () => {
  let component: CanMobileverifyComponent;
  let fixture: ComponentFixture<CanMobileverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanMobileverifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanMobileverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
