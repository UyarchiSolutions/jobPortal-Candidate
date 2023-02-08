import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanGetComponent } from './can-get.component';

describe('CanGetComponent', () => {
  let component: CanGetComponent;
  let fixture: ComponentFixture<CanGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanGetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
