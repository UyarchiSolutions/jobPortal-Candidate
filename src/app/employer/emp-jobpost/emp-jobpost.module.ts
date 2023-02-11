import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpJobpostRoutingModule } from './emp-jobpost-routing.module';
import { EmpJobpostComponent } from './emp-jobpost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [EmpJobpostComponent],
  imports: [
    CommonModule,
    EmpJobpostRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,

  ]
})
export class EmpJobpostModule { }
