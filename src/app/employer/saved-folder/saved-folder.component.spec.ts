import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFolderComponent } from './saved-folder.component';

describe('SavedFolderComponent', () => {
  let component: SavedFolderComponent;
  let fixture: ComponentFixture<SavedFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
