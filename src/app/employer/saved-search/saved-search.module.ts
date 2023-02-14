import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedSearchRoutingModule } from './saved-search-routing.module';
import { SavedSearchComponent } from './saved-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SavedSearchComponent],
  imports: [
    CommonModule,
    SavedSearchRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SavedSearchModule { }
