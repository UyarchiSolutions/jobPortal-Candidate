import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendJobComponent } from './send-job.component';

describe('SendJobComponent', () => {
  let component: SendJobComponent;
  let fixture: ComponentFixture<SendJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
