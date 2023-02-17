import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallcandidateProfileComponent } from './getallcandidate-profile.component';

describe('GetallcandidateProfileComponent', () => {
  let component: GetallcandidateProfileComponent;
  let fixture: ComponentFixture<GetallcandidateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallcandidateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallcandidateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
