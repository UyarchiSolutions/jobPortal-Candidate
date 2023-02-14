import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpreviewPopupComponent } from './jobpreview-popup.component';

describe('JobpreviewPopupComponent', () => {
  let component: JobpreviewPopupComponent;
  let fixture: ComponentFixture<JobpreviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpreviewPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
