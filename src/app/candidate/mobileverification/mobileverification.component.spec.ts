import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileverificationComponent } from './mobileverification.component';

describe('MobileverificationComponent', () => {
  let component: MobileverificationComponent;
  let fixture: ComponentFixture<MobileverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileverificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
