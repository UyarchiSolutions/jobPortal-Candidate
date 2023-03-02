import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpJobpostRoutingModule } from './emp-jobpost-routing.module';
import { EmpJobpostComponent } from './emp-jobpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [EmpJobpostComponent],
  imports: [
    CommonModule,
    EmpJobpostRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxEditorModule,
  ]
})
export class EmpJobpostModule { }
