import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpostViewComponent } from './jobpost-view.component';

describe('JobpostViewComponent', () => {
  let component: JobpostViewComponent;
  let fixture: ComponentFixture<JobpostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpostViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobpostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
