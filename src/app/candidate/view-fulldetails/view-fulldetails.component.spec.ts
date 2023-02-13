import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFulldetailsComponent } from './view-fulldetails.component';

describe('ViewFulldetailsComponent', () => {
  let component: ViewFulldetailsComponent;
  let fixture: ComponentFixture<ViewFulldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFulldetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFulldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
