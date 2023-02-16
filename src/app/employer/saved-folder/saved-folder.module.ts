import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedFolderRoutingModule } from './saved-folder-routing.module';
import { SavedFolderComponent } from './saved-folder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SavedFolderComponent],
  imports: [
    CommonModule,
    SavedFolderRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SavedFolderModule { }
