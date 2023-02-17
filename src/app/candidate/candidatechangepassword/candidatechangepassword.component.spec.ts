import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatechangepasswordComponent } from './candidatechangepassword.component';

describe('CandidatechangepasswordComponent', () => {
  let component: CandidatechangepasswordComponent;
  let fixture: ComponentFixture<CandidatechangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatechangepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatechangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
