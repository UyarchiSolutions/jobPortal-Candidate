import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMailTemplateComponent } from './create-mail-template.component';

describe('CreateMailTemplateComponent', () => {
  let component: CreateMailTemplateComponent;
  let fixture: ComponentFixture<CreateMailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
